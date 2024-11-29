import Stripe from "stripe";
import { NextResponse } from "next/server";  

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { email, paymentMethodId, priceId } = await req.json();  

  if (!email || !paymentMethodId || !priceId) {
    return NextResponse.json(
      { error: "Missing required fields: email, paymentMethodId, or priceId" },
      { status: 400 }
    );
  }

  try {
    
    const customer = await stripe.customers.create({
      email,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ["latest_invoice.payment_intent"], 
    });

    const invoice = await stripe.invoices.retrieve(subscription.latest_invoice.id);


    if(invoice.status === "paid") {
        return NextResponse.json({
            success: true,
            receipt_url: invoice.hosted_invoice_url,
            subscriptionId: subscription.id,
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        });
    }
    
  } catch (error) {
    console.error("Stripe error:", error); 
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
