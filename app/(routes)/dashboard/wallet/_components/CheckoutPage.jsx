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
  const[clientSecret,setClientSecret] = useState("") // payment intents ko indentify karne me aur uska secret store karne me kaam aata hai
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

    // console.log("here i am3")
    paidExpenseHandler() 


    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/dashboard/payment-success?amount=${expenseAmount}`,
      }
    })

    if(error) {
      setErrMsg(error.message);
      setLoading(false);
      return;    
    }


    try {
      router.replace(`http://localhost:3000/dashboard/payment-success?amount=${expenseAmount}`);
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="p-8 bg-white shadow-2xl rounded-lg w-full max-w-md"
    >

      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Complete Your Payment
      </h2>
  
      <p className="text-sm text-gray-600 text-center mb-6">
        Please review your payment details below and proceed to pay securely.
      </p>
  
      {clientSecret && (
        <div className="mb-6">
          <PaymentElement />
        </div>
      )}
  
      {errorMsg && (
        <div className="text-red-500 text-sm mb-4">
          {errorMsg}
        </div>
      )}
  
      <Button
        type="submit"
        className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        disabled={!stripe || loading}
      >
        {!loading ? "Pay Now" : "Processing..."}
      </Button>
  
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          By proceeding, you agree to our{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
          >
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
          >
            Privacy Policy
          </a>.
        </p>
      </div>
    </form>
  </div>
  
  )
}

export default CheckoutPage
