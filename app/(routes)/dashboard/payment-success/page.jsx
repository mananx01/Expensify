"use client";
import { CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Howl } from "howler";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


function PaymentSuccessPage() {

  const searchParamsFromUrl = useSearchParams();

  const [searchParams, setSearchParams] = useState(null);
  const [receiptUrl, setReceiptUrl] = useState(null)

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

    console.log('hereeeee');
    console.log(searchParams);

    
    const fetchReceiptUrl = async () => {
      try {
        // Create a server-side API call to retrieve the receipt URL
        const response = await fetch(`/api/receipt?paymentIntentId=${searchParamsFromUrl?.get("payment_intent")}`);
        const data = await response.json();

        if (data.receiptUrl) {
          setReceiptUrl(data.receiptUrl);
        }
      } catch (error) {
        console.error("Error fetching receipt URL:", error);
      }
    };

    if (searchParamsFromUrl?.get("payment_intent")) {
      fetchReceiptUrl();
    }



  }, [searchParamsFromUrl]);

  if (!searchParams) return <div>Loading...</div>; // Show loading state while waiting for searchParams



  const ReceiptLink = () => {
    if (!receiptUrl) return null;
    
    return (
      <div className="mb-4">
        <a 
          href={receiptUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Receipt
        </a>
      </div>
    );
  };


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

        {/* Print the receipt URL */}
        <div>
          <ReceiptLink/>
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
