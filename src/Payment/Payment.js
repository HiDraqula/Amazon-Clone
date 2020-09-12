import React, { useState, useEffect } from 'react'
import "./Payment.css"
import { useStateValue } from '../StateProvider'
import CheckoutProduct from '../Checkout/CheckoutProduct'
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getBasketTotal } from '../reducer'
import CurrencyFormat from 'react-currency-format'
import axios from '../axios'
import { db } from '../firebase'

// import FlipMove from 'react-flip-move';


function Payment() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements()

  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("")
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState(false)

  const getClientSecret = async () => {
    if (basket.length) {
      const response = await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunits // here 1$ = 100cents
        url: `/payments/create?total=${Math.round(getBasketTotal(basket) * 100)}`
      });
      setClientSecret(response.data.clientSecret)
    }
  }

  useEffect(() => {
    getClientSecret();
  }, [basket])

  console.log('The Client Secret >>> ', clientSecret)
  console.log('🧑', user, basket)

  const handleSubmit = async (event) => {
    // stripe stuff here
    event.preventDefault();
    if (clientSecret) {
      setProcessing(true);
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      }).then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        console.log({ paymentIntent })
        if (paymentIntent) {
          db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created
            })

          setSucceeded(true)
          setError(null)
          setProcessing(false);

          dispatch({
            type: 'EMPTY_BASKET'
          })

          history.replace('/orders')
        } else {
          console.error("STRIPE ERROR OCCURED")
        }
      }).catch(err => console.error(err))
    }
  }
  const handleChange = event => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "")
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {/* <FlipMove> */}
            {basket.map((item, i) => (<CheckoutProduct key={i} {...item} />))}
            {/* </FlipMove> */}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe... */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>{value}</h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button className="accent-btn" disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
