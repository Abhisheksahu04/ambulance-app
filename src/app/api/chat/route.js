import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req) {
  console.log("API route handler started");

  try {
    // Check API key first
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API Key is missing");
      return new Response(
        JSON.stringify({ error: "API Key configuration is missing." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Parse request body
    const body = await req.json();
    console.log("Received request body:", body);

    if (!body.query) {
      console.error("Query is missing from request body");
      return new Response(
        JSON.stringify({ error: "Query is required in request body." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You assist in emergency healthcare and ambulance booking.",
        },
        { role: "user", content: body.query },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log("OpenAI response received:", response);

    if (!response.choices?.[0]?.message?.content) {
      console.error("Unexpected OpenAI API response structure:", response);
      return new Response(
        JSON.stringify({ error: "Invalid response from OpenAI API." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ response: response.choices[0].message.content }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Detailed API Error:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });

    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
