const Stripe = require('stripe');

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

export default async function handler(req, res) {
  // Ensure only GET requests are handled
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract payment intent ID from query parameters
  const { paymentIntentId } = req.query;

  // Validate payment intent ID is provided
  if (!paymentIntentId) {
    return res.status(400).json({ error: 'Payment Intent ID is required' });
  }

  try {
    // Retrieve the payment intent and expand charges
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['charges']
    });

    // Check if charges exist and retrieve receipt URL
    if (paymentIntent.charges && paymentIntent.charges.data.length > 0) {
      const receiptUrl = paymentIntent.charges.data[0].receipt_url;
      
      // If receipt URL exists, return it
      if (receiptUrl) {
        return res.status(200).json({ receiptUrl });
      }
    }

    // If no receipt URL found
    return res.status(404).json({ error: 'No receipt found' });

  } catch (error) {
    // Log the error for server-side debugging
    console.error('Error retrieving receipt:', error);

    // Return a generic error response
    return res.status(500).json({ 
      error: 'Failed to retrieve receipt',
      details: error.message 
    });
  }
}