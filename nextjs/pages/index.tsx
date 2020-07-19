import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripeConfig from '../config/stripe';
import axios from 'axios';

const stripePromisse = loadStripe(stripeConfig.public_key)

const Checkout = ({ success }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if(!error){
      const { id } = paymentMethod;
      try{
        const { data } = await axios.post('/api/charge', {id, amount: 1099});
        console.log(data)
        success();
      }catch(erro){
        
      }
    /*if*/ }
  }

  return (
    <form 
    onSubmit={handleSubmit}
    style={{maxWidth: '400px', margin: '0 auto'}}>
      <h2>Preço: 20R$</h2>
      <img src="https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg"
      style={{maxWidth: "60px"}}
      />
    <CardElement />
      <button type="submit" disabled={!stripe}>
        Comprar
      </button>
    </form>
  )
}

const Home = () => {
  const [status, setStatus] = useState('ready');

  if(status === 'success'){
    return <div>Obrigrado pela compra</div>
  }
  return (
    <Elements stripe={stripePromisse}>
      <Checkout 
      success={() => {
        setStatus("success")
        }}/>
    </Elements>
  )
}

export default Home;