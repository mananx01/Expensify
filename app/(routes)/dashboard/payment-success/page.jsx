"use client"
import { CheckCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function PaymentSuccessPage() {

  const [searchParams, setSearchParams] = useState(null)
  const searchParamsFromUrl = useSearchParams()

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
    <div className='font-bold text-3xl text-green-600'>
      <div>
        <div className='font-bold text-green-950 text-2xl'>Amount: ${searchParams.amount}</div>
        <div className='font-bold text-green-950 text-xl'>Payment Intent: {searchParams.payment_intent}</div>
        <div className='font-bold text-green-950 text-xl'>Redirect Status: {searchParams.redirect_status}</div>
        <div className='flex items-center gap-3 '>
          <h2 className='font-bold text-3xl text-green-600'>Payment Successful </h2>
          <CheckCircle />
        </div>
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
