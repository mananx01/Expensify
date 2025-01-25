import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import Stripe from 'stripe';
import GetTransactions from './GetTransactions';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function PaymentPage() {

  return (

    <div className="bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
        <a href="#" className="text-blue-500 text-sm hover:underline">View All</a>
      </div>

      <GetTransactions/>
      
    </div>


  )
}

export default PaymentPage
