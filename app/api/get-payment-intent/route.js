import Stripe from 'stripe';
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

export async function GET(req, res) {
    
    try {
        const paymentIntents = await stripe.paymentIntents.list({
            limit: 200,
        });

        const filteredPaymentIntents = paymentIntents.data.filter(
            (intent) => intent.status !== 'requires_payment_method'
        );

        return new Response(JSON.stringify(filteredPaymentIntents), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error fetching payment intents:', error.message);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
}
