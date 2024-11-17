import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react'
import Stripe from 'stripe'

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)

function GetTransactions() {

    const [transactions, setTransactions] = useState([])
    const [isSet,setIsset] = useState(false)

    const {user} = useUser()

    useEffect(() => { 
        const fetchPaymentIntents = async () => {
            try {

                const response = await fetch('/api/get-payment-intent');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                
                setTransactions(data); 
                setIsset(true)
                console.log('Payment Intents:', data); 

            } catch (error) {
                console.error('Error fetching payment intents:', error.message);
            }
        };

        fetchPaymentIntents()

    },[])


  return (
    <div className='p-2'>
        <h1 className='font-bold text-xl'>Recent Transactions</h1>  
        <div>
            {isSet? transactions.map((t,index) => {
                return <div className='p-4 mt-5 border border-primary rounded-lg text-md mr-[20%] bg-slate-200'>
                    <div className='flex justify-between'>
                        <h2>Payment ID : </h2>
                        <h2 className='font-bold'>{t.id}</h2>
                    </div>
                    <div className='flex justify-between'>
                        <h2>Amount : </h2>
                        <h2 className='font-bold'>${t.amount/100}</h2>
                    </div>
                    <div className='flex justify-between'>
                        <h2>Currency : </h2>
                        <h2 className='font-bold'>{t.currency}</h2>
                    </div>
                    <div className='flex justify-between'>
                        <h2>Payment Time : </h2>
                        <h2 className='font-bold'>{new Date(t.created * 1000).toLocaleString()}</h2>
                    </div>
                    <div className='flex justify-between'>
                        <h2>Customer : </h2>
                        <h2 className='font-bold'>{t.customer? t.customer: user?.fullName}</h2>
                    </div>
                    <div className='flex justify-between'>
                        <h2>Payment Status : </h2>
                        {t.status == 'succeeded'?<h2 className='text-green-600 font-bold'>successful</h2>:<h2 className='text-red-600 font-bold'>{t.status}</h2>}
                    </div>
                   
                  
                </div>
            }): (
                <div className='text-lg'>Loading...</div>
            )}
        </div>




    </div>
  )
}

export default GetTransactions
