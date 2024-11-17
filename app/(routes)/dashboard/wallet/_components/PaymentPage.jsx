import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import Stripe from 'stripe';
import GetTransactions from './GetTransactions';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function PaymentPage() {

  return (
    <div className='p-10'>
        Payments
        <GetTransactions/>
    </div>
  )
}

export default PaymentPage
