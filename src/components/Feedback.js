"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/use-toast"
import { Star, Clock, Users, MessageSquare, Check, Send } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { authService } from "@/libs/appwrite";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [responseTime, setResponseTime] = useState("satisfied");
  const [staffBehavior, setStaffBehavior] = useState("professional");
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { feedbackService } = useAuth();

  const responseTimeOptions = [
    { value: "very-satisfied", label: "Very Satisfied" },
    { value: "satisfied", label: "Satisfied" },
    { value: "neutral", label: "Neutral" },
    { value: "dissatisfied", label: "Dissatisfied" }
  ];

  const staffBehaviorOptions = [
    { value: "very-professional", label: "Very Professional" },
    { value: "professional", label: "Professional" },
    { value: "needs-improvement", label: "Needs Improvement" }
  ];

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please provide an overall rating",
        variant: "destructive",
      });
      return;
    }

    const currentUser = await authService.getCurrentUser();

    console.log(currentUser);
    if(!currentUser) {
        toast({
            title: "Error",
            description: "Please login to submit feedback",
            variant: "destructive",
        });
        return;
    }
    setIsSubmitting(true);

    const result = await feedbackService(
      rating,
      responseTime,
      staffBehavior,
      comments,
      currentUser.$id
    );

    console.log(result);

    if (result.success) {
      toast({ title: "Success", description: result.message });
      setRating(0);
      setResponseTime("satisfied");
      setStaffBehavior("professional");
      setComments("");
    } else {
      toast({ title: "Error", description: result.message, variant: "destructive" });
    }

    setIsSubmitting(false);
  };

  const CustomRadioButton = ({ value, currentValue, onChange, label }) => (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex items-center space-x-3 w-full p-4 rounded-lg transition-all duration-200 ${
        currentValue === value 
          ? 'bg-emerald-50 border-2 border-emerald-500 shadow-sm' 
          : 'bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50'
      }`}
    >
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
        currentValue === value 
          ? 'bg-emerald-500' 
          : 'border-2 border-gray-300'
      }`}>
        {currentValue === value && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className={`text-base ${currentValue === value ? 'font-medium' : ''}`}>
        {label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
            Your Feedback Matters
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
            Help us improve our emergency medical services by sharing your experience
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-4 border-b pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl">Rate Your Experience</CardTitle>
            </div>
            <CardDescription className="text-base">
              Your feedback helps us maintain the highest standards of emergency care
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 pt-6">
            {/* Star Rating */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-emerald-600" />
                Overall Rating
              </Label>
              <div className="flex gap-3 justify-center bg-slate-50/80 p-6 rounded-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="transition-all duration-300 hover:scale-110"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      size={40}
                      className={`transition-colors duration-300 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Response Time
              </Label>
              <div className="grid gap-3">
                {responseTimeOptions.map(({ value, label }) => (
                  <CustomRadioButton
                    key={value}
                    value={value}
                    currentValue={responseTime}
                    onChange={setResponseTime}
                    label={label}
                  />
                ))}
              </div>
            </div>

            {/* Staff Behavior */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Staff Behavior
              </Label>
              <div className="grid gap-3">
                {staffBehaviorOptions.map(({ value, label }) => (
                  <CustomRadioButton
                    key={value}
                    value={value}
                    currentValue={staffBehavior}
                    onChange={setStaffBehavior}
                    label={label}
                  />
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-4">
              <Label htmlFor="comments" className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                Additional Comments
              </Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Please share your experience, suggestions, or concerns..."
                className="h-32 resize-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-4 border-t pt-6">
            <Button 
              variant="outline" 
              className="hover:bg-gray-100" 
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <p className="text-center text-gray-500 text-sm">
          Your feedback is confidential and will be used to improve our services
        </p>
      </div>
    </div>
  );
};

export default FeedbackPage;