"use client";
import { useState } from "react";
import { toast } from "sonner";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function PlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [email, setEmail] = useState(""); // Capture user's email
  const [loading, setLoading] = useState(false); // Add loading state
  const [receiptUrl, setReceiptUrl] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const plans = [
    {
      id: "basic-plan",
      name: "Basic Plan",
      description: "Ideal for small businesses just starting out.",
      features: ["✔ 10 Budgets", "✔ Basic Support", "✔ Access to Analytics"],
      price: "$19/month",
    },
    {
      id: "pro-plan",
      name: "Pro Plan",
      description: "Perfect for growing businesses.",
      features: ["✔ Unlimited Budgets", "✔ Priority Support", "✔ Advanced Analytics"],
      price: "$49/month",
    },
  ];

  const handlePlanSelection = (planId) => {
    setSelectedPlan(planId);
  };

  const confirmSelection = async () => {
    if (!selectedPlan) {
      toast.error("Please select a plan!");
      return;
    }

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded yet!");
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
   
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          email,
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false); 
        return;
      }

      const response = await fetch("/api/create-subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          paymentMethodId: paymentMethod.id,
          priceId: selectedPlan === "basic-plan" ? "price_1QPtTaAkDKo5XMnxGqCocMKh" : "price_1QPtUYAkDKo5XMnxBlglf4Nf",
        }),
      });

     
      const data = await response.text(); 
      console.log("Raw Response:", data);

      // Try parsing the response as JSON
      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (error) {
        console.error("Failed to parse response:", error);
        toast.error("Error processing the response.");
        return;
      }

      console.log("parsed data:", jsonData);

      if (response.ok) {
        setReceiptUrl(jsonData.receipt_url)
        toast.success("Subscription successful!");
      } else {
        toast.error(jsonData.error || "Error creating subscription.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-500 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card bg-white border-2 ${
              selectedPlan === plan.id ? "border-slate-900 bg-green-200" : "border-transparent"
            } shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow cursor-pointer`}
            onClick={() => handlePlanSelection(plan.id)}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{plan.name}</h2>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            <ul className="space-y-3 text-gray-700">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className="mt-6 text-xl font-semibold">{plan.price}</p>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="mt-8 w-full max-w-lg">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md p-3 mb-4"
          />
          <div className="border p-4 rounded-md bg-white">
            <CardElement className="p-2 border rounded-md" />
          </div>
          <button
            onClick={confirmSelection}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 mt-4 w-full"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Processing..." : `Subscribe to ${selectedPlan === "basic-plan" ? "Basic Plan" : "Pro Plan"}`}
          </button>
        </div>
      )}


    {receiptUrl && (
      <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md text-center max-w-lg mx-auto">
        <p className="text-xl font-semibold text-gray-800 mb-4">Your subscription was successful!</p>
        <p className="text-gray-600 mb-6">You can download your receipt from the link below.</p>
        <a
          href={receiptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition duration-200"
        >
          View your receipt
        </a>
      </div>
    )}


    </div>
  );
}
