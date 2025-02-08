export async function POST(req) {
  try {
    const body = await req.json();
    const { amount } = body;

    if (!amount) {
      return Response.json({ message: "Amount is required" }, { status: 400 });
    }

    const fakePaymentResponse = {
      status: "success",
      paymentId: `PAY-${Math.floor(Math.random() * 100000)}`,
      amount: amount,
      transactionDate: new Date().toISOString(),
      success_url: "/booking/success",
      cancel_url: "/booking/cancel",
    };

    return Response.json(fakePaymentResponse, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Payment failed" }, { status: 500 });
  }
}
