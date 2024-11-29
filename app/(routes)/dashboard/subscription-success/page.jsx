"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubscriptionSuccess() {
  const [receiptUrl, setReceiptUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.receiptUrl) {
      setReceiptUrl(router.query.receiptUrl); 
    }
  }, [router.query.receiptUrl]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-500 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Subscription Successful!</h1>
      <p className="text-lg mb-6">Thank you for your subscription! Your receipt is available below:</p>
      {receiptUrl && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md text-center">
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
