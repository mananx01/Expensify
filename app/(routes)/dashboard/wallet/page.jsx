"use client"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import CheckoutPage from './_components/CheckoutPage';
import { useUser } from '@clerk/nextjs';
import PaymentPage from './_components/PaymentPage';


if(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function page({searchParams}) {

    const {expenseID, expenseName, expenseAmount} = searchParams;
    const {user} = useUser()

    if(!expenseAmount || !expenseName) {
        return <PaymentPage/>
    }


  return (
    <div className='p-10 h-screen bg-gradient-to-br from-slate-100 to-gray-200'>
        <div>
            <h1 className='text-lg'>{user?.fullName} has requested payment of 
                <h2 className='font-bold text-xl'>${expenseAmount} </h2> 
                for the expense of {expenseName} id: {expenseID}</h1>
        </div>

        <Elements
            stripe={stripePromise}
            options={{
                mode: "payment",
                amount: Number(expenseAmount*100),
                currency: "usd",
            }}
        >
            <CheckoutPage expenseAmount={expenseAmount} expenseName={expenseName} expenseID={expenseID}></CheckoutPage>
        </Elements>

    </div>
  )
}

export default page
