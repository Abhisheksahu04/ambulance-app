import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Lock, CheckCircle } from "lucide-react";

const FakePaymentForm = ({ onSuccess, amount = 500 }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .substring(0, 19);
    }
    if (name === "cardExpiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);
    }
    if (name === "cardCvc") {
      formattedValue = value.replace(/\D/g, "").substring(0, 3);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowSuccess(true);
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-xl font-semibold">Payment Successful!</h2>
            <p className="text-gray-600">Your ambulance is on the way.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Secure Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-lg font-semibold">Total Amount: ₹{amount}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Card Number</label>
              <Input
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <Input
                  name="cardExpiry"
                  placeholder="MM/YY"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CVC</label>
                <Input
                  name="cardCvc"
                  placeholder="123"
                  value={formData.cardCvc}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cardholder Name</label>
              <Input
                name="cardName"
                placeholder="John Smith"
                value={formData.cardName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
              <Lock className="h-4 w-4" />
              <span>Your payment information is secure</span>
            </div>

            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay ₹${amount}`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FakePaymentForm;
