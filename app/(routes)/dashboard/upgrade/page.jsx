"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PlanSelection from "./_components/PlanSelection";


// Load Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function UpgradePage() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
      <Elements stripe={stripePromise}>
        <PlanSelection />
      </Elements>
    </div>
  );
}
