import Stripe from 'stripe';
import stripeConfig from '../../config/stripe';

const stripe = new Stripe(stripeConfig.secret_key, {apiVersion: '2020-03-02'});

export default async function (req, res) {
    const { id, amount } = req.body;

    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'BRL',
            description: 'Delicia laranja',
            payment_method: id,
            confirm: true,
        })
        console.log(payment);

        return res.json({
            confirm: 'abc123'
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message: error.message
        })
    }
}