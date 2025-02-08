"use client";

import React, { useState, useEffect } from "react";
import { Send, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCPxXsq9_9i_MYhAmNSa9BrZPyz50WOCGc");

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I assist you in an emergency?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const newChat = await model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: "You are an emergency healthcare assistant." }],
            },
          ],
        });
        setChat(newChat);
      } catch (err) {
        console.error("Initialization error:", err);
      }
    };
    initializeChat();
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || !chat) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await chat.sendMessage(input);
      const response = await result.response;
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: response.text() },
      ]);
    } catch (err) {
      console.error("API Error:", err);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-600 fixed bottom-20 right-10 hover:bg-blue-700"
      >
        <MessageCircle className="mr-2 h-5 w-5" /> Chat with AI
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Emergency Healthcare Assistant</DialogTitle>
          </DialogHeader>
          <Card className="w-full h-[500px] flex flex-col">
            <CardContent className="flex-grow overflow-hidden">
              <ScrollArea className="h-[400px] pt-4 ">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.role === "user" ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    <Alert
                      className={
                        message.role === "user" ? "bg-blue-50" : "bg-gray-50"
                      }
                    >
                      <AlertDescription className="whitespace-pre-line">
                        {message.content}
                      </AlertDescription>
                    </Alert>
                  </div>
                ))}
                {isLoading && (
                  <Alert className="bg-gray-50">
                    <AlertDescription>
                      Processing your request...
                    </AlertDescription>
                  </Alert>
                )}
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex w-full gap-2">
                <Input
                  placeholder="Type your emergency needs..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={!chat || isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!chat || isLoading || !input.trim()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chatbot;
