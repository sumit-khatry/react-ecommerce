import React,{Fragment, useState,useEffect,useRef} from "react"
import CheckoutSteps from "../Cart/CheckoutSteps"
import { useSelector, useDispatch } from "react-redux"
// import MetaData from "../layout/MetaData"
import { Typography } from "@material-ui/core"
// import { useAlert } from "react-alert"
// import {
//     CardNumberElement,
//     CardCvcElement,
//     CardExpiryElement,
//     useStripe,
//     useElements,
// } from "@stripe/react-stripe-js"
import axios from "axios"
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import {createOrder, clearErrors} from "../../actions/orderAction";
const Payment = ({history}) => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    // const alert = useAlert();
    // const stripe = useStripe();
    // const elements = useElements();

    //declearing ref btn
    // const payBtn= useRef(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");


    const {shippingInfo, cartItems}= useSelector((state)=> state.cart);
    const {user} = useSelector((state)=> state.user);
    const {error} = useSelector((state)=>state.newOrder);

   
    const order = {
        shippingInfo,
        name:user.name,
        email:user.email,
        line1: shippingInfo.address,
        city:shippingInfo.city,
        state:shippingInfo.state,
        postal_code: shippingInfo.pinCode,
        country:shippingInfo.country,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
      };

    //making handler
    const submitHandler = async(e)=>{
        e.preventDefault();
        dispatch(createOrder(order));
        history.push("/success");
     
    };
    useEffect(() => {
        if (error) {
        //   alert.error(error);
          dispatch(clearErrors());
        }
      }, [dispatch, error, alert]);
    return (
        <Fragment>
            {/* <MetaData title="Payment"/> */}
            <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label">Cash on Delivery</label>
            </div>
          </div>

          <button type="submit">Continue</button>
        </form>
      </div>
        </Fragment>
    )
}

export default Payment
