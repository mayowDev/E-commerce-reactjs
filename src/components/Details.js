import React, { Component } from "react";
import { ProductConsumer } from "../Context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {
            title,
            inCart,
            img,
            info,
            price,
            id,
            company
          } = value.detailProduct;
          return (
            <div className='container py-5'>
              {/* title start*/}
              <div className='row'>
                <div className='col-10 mx-auto text-center text-slanted text-blue my-5'>
                  <h1>{title}</h1>
                </div>
              </div>
              {/* end title */}
              {/* product info start */}
              <div className='row'>
                <div className='col-10 col-md-6 mx-auto my-3 '>
                  <img src={img} alt='product' className='img-fluid' />
                </div>
                {/* product text */}
                <div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>
                  <h2>model :{title}</h2>
                  <h4 className='text-title text-muted text-uppercase mt-3 mb-2'>
                    made by <span className='text-uppercase'>{company}</span>
                  </h4>
                  <h4 className='text-blue'>
                    <strong>
                      Price <span>$ </span>
                      {price}
                    </strong>
                  </h4>
                  <p className='text-capitalize font-weight-bold mt-3 mb-0'>
                    info about the product
                  </p>
                  <p className='text-muted lead'>{info}</p>
                  {/* buttons */}
                  <div>
                    <Link to='/'>
                      <ButtonContainer>Back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "inCart" : "Add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default Details;
