import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

function StripeCheckoutButton({ price }) {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_51INDsBJ4gSS7mH8o2i1k1yHuaaCfEvK0fGli2kOciLQwTlYzTjt2BycyS25maihCR9lTueUBTGQFNms50BzhkvaK00N7b24U2H'

  const onToken = token => {
    console.log(token)
    alert('Payment succeeded!')
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='JC Clothing'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton