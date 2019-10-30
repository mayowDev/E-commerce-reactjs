import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function CartTotal({ value }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
  return (
    <Fragment>
      <div className='container'>
        <div className='row'>
          {/* clear btn  */}
          <div className='col-10 mt-2 ml-sm-5 ml-md-auto col-8 text-capitalize text-right'>
            <Link to='/'>
              <button
                className='btn btn-outline-danger text-uppercase mb-3 px-5'
                type='buttton'
                onClick={() => clearCart()}
              >
                Clear Cart
              </button>
            </Link>
            <h5>
              <span className='text-title'>subtotal:</span>
              <strong>${cartSubTotal}</strong>
            </h5>
            <h5>
              <span className='text-title'>Tax:</span>
              <strong>${cartTax}</strong>
            </h5>
            <h5>
              <span className='text-title'>cartTotal:</span>
              <strong>${cartTotal}</strong>
            </h5>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
