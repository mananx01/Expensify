"use client"
import { CheckCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function PaymentSuccessPage() {

  const [searchParams, setSearchParams] = useState(null)
  const searchParamsFromUrl = useSearchParams()

  const route = useRouter();

  // const goToDashboard = () => {
  //   route.replace(`http://www.localhost:3000/dashboard`);
  // }

  useEffect(() => {
    if (searchParamsFromUrl) {
      const params = {
        amount: searchParamsFromUrl?.get('amount'),
        payment_intent: searchParamsFromUrl?.get('payment_intent'),
        payment_intent_client_secret: searchParamsFromUrl?.get('payment_intent_client_secret'),
        redirect_status: searchParamsFromUrl?.get('redirect_status'),
      };
      setSearchParams(params);
    }
  }, [searchParamsFromUrl])

  if (!searchParams) return <div>Loading...</div> // Show a loading state while waiting for searchParams

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-green-200">
  <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
 
    <div className="flex items-center justify-center bg-green-100 text-green-600 rounded-full h-16 w-16 mx-auto mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z" />
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

    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
      Go to Dashboard
    </button>
  </div>
</div>



  )
}


export default function Page() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessPage />
    </React.Suspense>
  );
}
