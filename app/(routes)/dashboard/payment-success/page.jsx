"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Howl } from "howler";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


function PaymentSuccessPage() {

  const searchParamsFromUrl = useSearchParams();

  const [searchParams, setSearchParams] = useState(null);
  const route = useRouter();

  const goToDashboard = () => {
    route.replace(`http://localhost:3000/dashboard`);
  };

  useEffect(() => {
    // const successSound = new Howl({
    //   src: ["/sounds/paid.mp3"],
    //   volume: 1.0,
    // });

    // successSound.play();

    if (searchParamsFromUrl) {
      const params = {
        amount: searchParamsFromUrl?.get("amount"),
        payment_intent: searchParamsFromUrl?.get("payment_intent"),
        payment_intent_client_secret: searchParamsFromUrl?.get("payment_intent_client_secret"),
        redirect_status: searchParamsFromUrl?.get("redirect_status"),
      };
      setSearchParams(params);
    }

    console.log('here');
    console.log(searchParams);

  }, [searchParamsFromUrl]);

  // Show loading state while waiting for searchParam
  if (!searchParams) return <div>Loading...</div>; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <div className="flex items-center justify-center bg-green-100 text-green-600 rounded-full h-16 w-16 mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-green-700 mb-4">Payment Successful!</h1>

        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been successfully processed.
        </p>

        <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
          <p className="text-gray-700 font-medium">Transaction ID:</p>
          <p className="text-green-700 font-semibold">#ll{searchParams.payment_intent}</p>
        </div>

        <button
          onClick={goToDashboard}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessPage />
    </React.Suspense>
  );
}
