import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

function Payment() {
  const handleToken = async (token) => {
    try {
      const res = await axios.post('http://localhost:3000/pay', { token });
      alert('Payment successful');
      console.log('Payment response:', res.data);
    } catch (error) {
      alert('Payment failed');
    }
  };

  return (
    <StripeCheckout
      stripeKey="YOUR_STRIPE_PUBLIC_KEY"
      token={handleToken}
      amount={5000} // Amount in cents ($50.00)
      name="Twitter Ad Service"
      billingAddress
      shippingAddress
    />
  );
}

export default Payment;
