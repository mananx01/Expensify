"use client"
import { useState } from "react";
import { toast } from "sonner";

export default function PlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState(null);

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

  const confirmSelection = () => {
    if (selectedPlan) {
      toast(`You have selected the ${selectedPlan === "basic-plan" ? "Basic Plan" : "Pro Plan"}`)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card bg-white border-2 ${
              selectedPlan === plan.id ? "border-slate-900 bg-green-100" : "border-transparent"
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
        <button
          onClick={confirmSelection}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 mt-8"
        >
          Confirm Selection
        </button>
      )}
    </div>
  );
}
