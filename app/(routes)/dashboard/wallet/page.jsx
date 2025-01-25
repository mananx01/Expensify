"use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { Suspense } from 'react'
import CheckoutPage from './_components/CheckoutPage';
import { useUser } from '@clerk/nextjs';
import PaymentPage from './_components/PaymentPage';
import { useSearchParams } from 'next/navigation';

if(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Walletpage({searchParams}) {

    const Params = useSearchParams();
    const expenseID = Params.get('expenseID');
    const expenseName = Params.get('expenseName');
    const expenseAmount = parseFloat(Params.get('expenseAmount')) || 0;
    // const {expenseID, expenseName, expenseAmount} = searchParams;
    const {user} = useUser()

    if(!expenseAmount || !expenseName) {
        return <PaymentPage/>
    }


  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
            <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
                Payment Request
            </h1>
            <p className="text-gray-600 mt-4 text-center">
                <span className="font-medium">{user?.fullName}</span> has requested a
                payment of:
            </p>
            <h2 className="font-bold text-3xl text-blue-600 text-center mt-2">
                ${expenseAmount}
            </h2>
            <p className="text-gray-500 text-center mt-4">
                for the expense:
                <span className="font-medium text-gray-700"> {expenseName}</span>
                <br />
                <span className="text-sm text-gray-400">Expense ID: {expenseID}</span>
            </p>
            </div>


            <div className="border-t rounded border-gray-200 pt-6">
            <Elements
                stripe={stripePromise}
                options={{
                mode: "payment",
                amount: Number(expenseAmount * 100),
                currency: "usd",
                }}
            >
                <CheckoutPage
                expenseAmount={expenseAmount}
                expenseName={expenseName}
                expenseID={expenseID}
                />
            </Elements>
            </div>
        </div>
    </div>

  )
}


export default function page() {
    return (
        <Suspense fallback={<div>Loading payment page...</div>}>
        <Walletpage />
        </Suspense>
    );
}