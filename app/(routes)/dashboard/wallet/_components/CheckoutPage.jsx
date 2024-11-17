"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/dbConfig'
import { expenses } from '@/utils/schema'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function CheckoutPage({expenseID,expenseName, expenseAmount,}) {

    const stripe = useStripe()
    const elements = useElements()

    const[errorMsg, setErrMsg] = useState()
    const[clientSecret,setClientSecret] = useState("")
    const [loading,setLoading] = useState(false)

    const router = useRouter();


    const paidExpenseHandler = async () => {
        try {
            const res = await db.update(expenses)
            .set({
                paid: true,
            })
            .where(
                eq(expenses.id,expenseID)
            ).returning()

            console.log("paid with return: ", res)
        }
        catch(err) {
            console.log(`Internal Server Error: `, err);
        }
    }


    useEffect(()=> {

        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({amount: Number(expenseAmount*100)}),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));

    },[expenseAmount])


    const handleSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        
        if(!stripe || !elements) {
            return;
        }
   
        const {error: submitError} = await elements.submit();

        if(submitError) {
            setErrMsg(submitError.message);
            setLoading(false);
            return;
        }

        console.log("here i am3")
        paidExpenseHandler() 

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://www.localhost:3000/dashboard/payment-success?amount=${expenseAmount}`,
            }
        })

        if(error) {
            setErrMsg(error.message);
            setLoading(false);
            return;    
        }
    

        try {

            // Navigate to the success page
            router.replace(`http://www.localhost:3000/dashboard/payment-success?amount=${expenseAmount}`);
            
        }
        catch(err){
            console.error("Error updating expense in the database:", err.message);
            setErrMsg("Payment succeeded, but marking as paid failed.");
        }


        setLoading(false);

    }

    if(!clientSecret || !stripe || !elements) {
        return <div>Loading...</div>
    }



  return (
    <form onSubmit={(e) => handleSubmit(e)} className='p-5 bg-white rounded-md w-[500px] mt-5'>
        {clientSecret && <PaymentElement/>} 
        {errorMsg && <div>{errorMsg}</div>}  
        <Button 
            type="submit"
            className="w-full mt-4"
            disabled={!stripe || loading}
        >{!loading? `Initiate Transaction`: `Processing...`}</Button>   
    </form>
  )
}

export default CheckoutPage
