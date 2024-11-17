import { json } from "drizzle-orm/mysql-core";
import { Currency } from "lucide-react";
import { NextResponse } from "next/server";

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`); 

export async function POST(req) {
    
    try {       

        const {amount} = await req.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd", 
            automatic_payment_methods: {enabled: true},
        });

        return NextResponse.json({clientSecret: paymentIntent.client_secret});

    } catch(err) {
        console.log("Internal Error: ", err);
        return NextResponse.json(
            {error: `Internal Server Error: ${err}`},
            {status: 500}
        );
    }

}