import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

function StripeCheckoutButton({ price }) {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_51INDsBJ4gSS7mH8o2i1k1yHuaaCfEvK0fGli2kOciLQwTlYzTjt2BycyS25maihCR9lTueUBTGQFNms50BzhkvaK00N7b24U2H'

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'POST',
      data: {
        amount: priceForStripe,
        token
      }
    })
      .then(response => alert('Payment succeeded!'))
      .catch(error => {
        console.log('Payment error: ', JSON.parse(error))
        alert('There was a problem with payment. Please use the provided credit card.')
      })
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='JC Clothing'
      billingAddress
      shippingAddress
      // image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton