import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";

// import FlipMove from 'react-flip-move';

// const FmOptions = {
//   // enterLeaveAnimation: 'accordionHorizontal'
//   // enterLeaveAnimation: 'accordionVertical'
//   // enterLeaveAnimation: null
//   enterLeaveAnimation: 'fade'

// }

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket {!basket.length && "is Empty"}</h2>
          {!basket.length && <img className="emptyCartImg" src="/images/kart1.svg" alt="" />}
          {/* <FlipMove enterAnimation={FmOptions.enterLeaveAnimation} leaveAnimation={FmOptions.enterLeaveAnimation} > */}
          {basket.map((item, i) => <CheckoutProduct key={i} {...item} />)}
          {/* </FlipMove> */}

        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
