"use client";
import { useState } from "react";

export default function Payment() {
  const [paid, setPaid] = useState(false);

  const handlePayment = () => {
    alert("Payment Successful ✅");
    setPaid(true);
  };

  return (
    <div className="mt-4 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold">💳 Payment</h2>
      <button
        onClick={handlePayment}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        Pay ₹500
      </button>
      {paid && <p className="mt-2 text-green-600">✔ Payment Completed!</p>}
    </div>
  );
}
