import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import Stripe from 'stripe';
import GetTransactions from './GetTransactions';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function PaymentPage() {

  return (

    <div class="bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <h2 class="text-lg font-semibold text-gray-800">Recent Transactions</h2>
        <a href="#" class="text-blue-500 text-sm hover:underline">View All</a>
      </div>

      <GetTransactions/>
      
    </div>


  )
}

export default PaymentPage
