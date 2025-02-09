"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  CreditCard,
  Heart,
  Shield,
  User,
  Clock,
  Activity,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const HealthcareDashboard = () => {
  const [activeScheme, setActiveScheme] = useState("ayushman");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showHealthRecords, setShowHealthRecords] = useState(false);
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);

  const schemes = {
    ayushman: {
      name: "Ayushman Bharat",
      cardNumber: "AB-2024-1234-5678",
      coverage: "₹5,00,000",
      utilized: "₹75,000",
      validTill: "31 Dec 2025",
      status: "Active",
    },
    state: {
      name: "State Health Insurance",
      cardNumber: "SHI-2024-8765-4321",
      coverage: "₹3,00,000",
      utilized: "₹25,000",
      validTill: "15 Mar 2025",
      status: "Active",
    },
  };

  const recentClaims = [
    {
      date: "15 Jan 2024",
      hospital: "Apollo Hospitals",
      amount: "₹45,000",
      status: "Approved",
    },
    {
      date: "03 Dec 2023",
      hospital: "Max Healthcare",
      amount: "₹30,000",
      status: "Approved",
    },
    {
      date: "28 Nov 2023",
      hospital: "Fortis Hospital",
      amount: "₹25,000",
      status: "Processing",
    },
  ];

  const upcomingAppointments = [
    {
      date: "22 Feb 2024",
      doctor: "Dr. Sharma",
      type: "Follow-up",
      time: "10:30 AM",
    },
    {
      date: "28 Feb 2024",
      doctor: "Dr. Patel",
      type: "Regular Checkup",
      time: "2:15 PM",
    },
  ];
  const handleVerifyCoverage = async () => {
    setIsVerifying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Coverage Verified Successfully",
        description: "Your insurance coverage is active and valid.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmitClaim = (e) => {
    e.preventDefault();
    toast({
      title: "Claim Submitted Successfully",
      description: "Your claim has been received and is being processed.",
      duration: 3000,
    });
    setShowClaimForm(false);
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    toast({
      title: "Appointment Scheduled",
      description: "Your appointment has been confirmed.",
      duration: 3000,
    });
    setShowAppointmentForm(false);
  };
  return (
    <div className="container mx-auto p-6 space-y-6 max-w-7xl">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Healthcare Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your insurance and healthcare benefits
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleVerifyCoverage}
          disabled={isVerifying}
        >
          <Shield className="mr-2 h-4 w-4" />
          {isVerifying ? "Verifying..." : "Verify Coverage"}
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Insurance Overview Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Insurance Overview</CardTitle>
            <CardDescription>
              Your active insurance policies and coverage details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="ayushman" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ayushman">Ayushman Bharat</TabsTrigger>
                <TabsTrigger value="state">State Insurance</TabsTrigger>
              </TabsList>

              {Object.entries(schemes).map(([key, scheme]) => (
                <TabsContent key={key} value={key} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Card Number</p>
                      <p className="font-medium">{scheme.cardNumber}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Valid Till</p>
                      <p className="font-medium">{scheme.validTill}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Coverage Utilized
                      </span>
                      <span className="text-sm text-gray-500">
                        {scheme.utilized} of {scheme.coverage}
                      </span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>

                  <div className="flex items-center space-x-2 mt-4">
                    <Badge
                      variant="success"
                      className="bg-green-100 text-green-800"
                    >
                      {scheme.status}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Last verified 2 days ago
                    </span>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Submit Claim Dialog */}
            <Dialog open={showClaimForm} onOpenChange={setShowClaimForm}>
              <DialogTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" /> Submit New Claim
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Submit Insurance Claim</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to submit your insurance claim.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitClaim} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital Name</Label>
                    <Input
                      id="hospital"
                      placeholder="Enter hospital name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Claim Amount</Label>
                    <Input
                      id="amount"
                      placeholder="Enter amount"
                      type="number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date of Service</Label>
                    <Input id="date" type="date" required />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit Claim</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Book Appointment Dialog */}
            <Dialog
              open={showAppointmentForm}
              onOpenChange={setShowAppointmentForm}
            >
              <DialogTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" /> Schedule Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule an Appointment</DialogTitle>
                  <DialogDescription>
                    Choose your preferred date and time for the appointment.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBookAppointment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor">Select Doctor</Label>
                    <Input id="doctor" placeholder="Choose doctor" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointmentDate">Preferred Date</Label>
                    <Input id="appointmentDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointmentTime">Preferred Time</Label>
                    <Input id="appointmentTime" type="time" required />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Book Appointment</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Health Records Dialog */}
            <Dialog
              open={showHealthRecords}
              onOpenChange={setShowHealthRecords}
            >
              <DialogTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="mr-2 h-4 w-4" /> View Health Records
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Health Records</DialogTitle>
                  <DialogDescription>
                    View your recent health records and medical history.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Sample health records */}
                  <div className="border p-4 rounded-lg">
                    <h4 className="font-medium">Annual Checkup</h4>
                    <p className="text-sm text-gray-500">15 Jan 2024</p>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h4 className="font-medium">Blood Test Results</h4>
                    <p className="text-sm text-gray-500">03 Dec 2023</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Profile Update Dialog */}
            <Dialog
              open={showProfileUpdate}
              onOpenChange={setShowProfileUpdate}
            >
              <DialogTrigger asChild>
                <Button className="w-full justify-start" variant="outline">
                  <User className="mr-2 h-4 w-4" /> Update Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Profile</DialogTitle>
                  <DialogDescription>
                    Update your personal information and preferences.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        toast({
                          title: "Profile Updated",
                          description:
                            "Your profile has been updated successfully.",
                          duration: 3000,
                        });
                        setShowProfileUpdate(false);
                      }}
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Recent Claims */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Claims</CardTitle>
            <CardDescription>Track your insurance claims</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {recentClaims.map((claim, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${
                          claim.status === "Approved"
                            ? "bg-green-100"
                            : "bg-yellow-100"
                        }`}
                      >
                        {claim.status === "Approved" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{claim.hospital}</p>
                        <p className="text-sm text-gray-500">{claim.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{claim.amount}</p>
                      <Badge
                        variant={
                          claim.status === "Approved" ? "success" : "warning"
                        }
                        className={
                          claim.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {claim.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                {upcomingAppointments.map((appointment, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{appointment.doctor}</p>
                      <Badge variant="outline">{appointment.type}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" /> {appointment.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" /> {appointment.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthcareDashboard;
