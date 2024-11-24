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
        <div>
            {isSet? transactions.map((t,index) => {

                return    <div class="flex justify-between items-center mt-4 bg-white shadow-lg rounded-lg p-6 w-full mx-auto">
                <div class="flex items-center space-x-4">
                  <div class="bg-blue-100 text-blue-500 rounded-full h-10 w-10 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-16 h-16 text-green-500"
                        >
                        <circle cx="12" cy="12" r="10" stroke="currentColor"></circle>
                        <path d="M9 12l2 2 4-4" stroke="currentColor"></path>
                    </svg>

                  </div>
                  <div>
                    {t.status == 'succeeded'?  <p className="text-xsm font-medium text-gray-700">Payment {t.status}</p>: 
                        <p  className="text-sm font-medium text-gray-700">Payment Pending</p>}
                    <p className="text-sm font-medium text-gray-500">Payment id: {t.id}</p>
                    <p className="text-xs text-gray-500">{new Date(t.created * 1000).toLocaleString()}</p>
                  </div>
                </div>
                <p class="text-sm font-medium text-red-500">- ${t.amount}</p>
              </div>

                


                // return <div className='p-4 mt-5 border border-primary rounded-lg text-md mr-[20%] bg-slate-200'>
                //     <div className='flex justify-between'>
                //         <h2>Payment ID : </h2>
                //         <h2 className='font-bold'>{t.id}</h2>
                //     </div>
                //     <div className='flex justify-between'>
                //         <h2>Amount : </h2>
                //         <h2 className='font-bold'>${t.amount/100}</h2>
                //     </div>
                //     <div className='flex justify-between'>
                //         <h2>Currency : </h2>
                //         <h2 className='font-bold'>{t.currency}</h2>
                //     </div>
                //     <div className='flex justify-between'>
                //         <h2>Payment Time : </h2>
                //         <h2 className='font-bold'>{new Date(t.created * 1000).toLocaleString()}</h2>
                //     </div>
                //     <div className='flex justify-between'>
                //         <h2>Customer : </h2>
                //         <h2 className='font-bold'>{t.customer? t.customer: user?.fullName}</h2>
                //     </div>
                //     <div className='flex justify-between'>
                //         <h2>Payment Status : </h2>
                //         {t.status == 'succeeded'?<h2 className='text-green-600 font-bold'>successful</h2>:<h2 className='text-red-600 font-bold'>{t.status}</h2>}
                //     </div>
                // </div>





            }): (
                <div className='text-lg'>Loading...</div>
            )}
        </div>




    </div>
  )
}

export default GetTransactions
