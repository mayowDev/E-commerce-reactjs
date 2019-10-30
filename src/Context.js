import React, { Component, createContext } from "react";

import { storeProducts, detailProduct } from "./data";

const ProductContext = createContext();

// provider
class ProductProvider extends Component {
  state = {
    products: [],
    cart: [], //TEMPRORY ONLY []
    detailProduct: detailProduct,
    modal: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  // componentDidMount
  componentDidMount() {
    this.setProducts();
  }

  // setProducts
  setProducts = () => {
    let copyProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      copyProducts = [...copyProducts, singleItem];
    });

    this.setState({ products: copyProducts });
  };
  // getItem
  getItem = id => {
    const { products } = this.state;
    const product = products.find(item => item.id === id);
    return product;
  };

  // addToCart
  addToCart = id => {
    const { products, cart } = this.state;
    let copyProducts = [...products];
    const index = copyProducts.indexOf(this.getItem(id));
    const product = copyProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: copyProducts, cart: [...cart, product] };
      },
      // callback to call addTotals white addTocart
      () => {
        this.addTotals();
      }
    );
  };
  // openModal when we click icon cart plus
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  // closeModal
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  // handleDetail
  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  // incremant
  increment = id => {
    let copycart = [...this.state.cart];
    // find index of our selecteditem
    const selecteditem = copycart.find(item => item.id === id);
    const index = copycart.indexOf(selecteditem);
    const product = copycart[index];

    // change count and total based on incremented item
    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(
      () => {
        return {
          cart: [...copycart]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  // decrement
  decrement = id => {
    let copycart = [...this.state.cart];
    const selecteditem = copycart.find(item => item.id === id);
    const index = copycart.indexOf(selecteditem);
    const product = copycart[index];

    // change count and total based on incremented item
    product.count = product.count - 1;

    // check if product is less than 0 then remove

    if (product.count === 0) {
      this.removeProduct(id);
    } else {
      product.total = product.count * product.price;

      this.setState(
        () => {
          return {
            cart: [...copycart]
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  // removeproduct
  removeProduct = id => {
    let tempproduct = [...this.state.products];
    let tempcart = [...this.state.cart];

    // filterout selected item
    tempcart = tempcart.filter(item => item.id !== id);
    // find selcted/removed item from products
    const index = tempproduct.indexOf(this.getItem(id));
    let removedProduct = tempproduct[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    // set our states to new changes
    this.setState(
      () => {
        return {
          cart: [...tempcart],
          products: [...tempproduct]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  // clearCart
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  // addtotals
  addTotals = () => {
    let subtotal = 0;
    this.state.cart.map(item => (subtotal += item.total));
    const temptax = subtotal * 0.1;
    const Tax = parseFloat(temptax.toFixed(2));
    const total = subtotal + Tax;
    this.setState(() => {
      return {
        cartSubTotal: subtotal,
        cartTax: Tax,
        cartTotal: total
      };
    });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeProduct: this.removeProduct,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductConsumer, ProductProvider };
