"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "react-hot-toast";

const RegistrationForm = () => {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({});
  const [address, setAddress] = useState(""); // Store the fetched address
  const { updateUserDetails } = useAuth();
  const router = useRouter();

  const fetchAddressByPincode = async (pincode) => {
    if (pincode.length !== 6) return; // Ensure valid pincode length

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      if (data[0].Status === "Success") {
        const location = data[0].PostOffice[0];
        const fullAddress = `${location.Name}, ${location.District}, ${location.State}`;
        setAddress(fullAddress);
        setFormData({ ...formData, address: fullAddress });
        toast.success("Pincode verified!");
      } else {
        setAddress("");
        toast.error("Invalid Pincode! Please check again.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      toast.error("Failed to verify pincode.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails({ userType, ...formData });
      toast.success("User details saved successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving user details:", error);
      toast.error("Failed to save user details. Please try again.");
      // router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Complete Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">I am a:</Label>
              <RadioGroup
                value={userType}
                onValueChange={setUserType}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient">Patient</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="driver" id="driver" />
                  <Label htmlFor="driver">Driver</Label>
                </div>
              </RadioGroup>
            </div>

            {userType === "patient" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    type="number"
                    onChange={(e) => {
                      const pincode = e.target.value;
                      setFormData({ ...formData, pincode });
                      fetchAddressByPincode(pincode); // Fetch address when user enters pincode
                    }}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    readOnly
                    placeholder="Address will be filled automatically"
                  />
                </div>
                <div>
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    type="tel"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emergencyContact: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            )}

            {userType === "driver" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                  <Input
                    id="vehicleNumber"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        vehicleNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        licenseNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="driverPincode">Pincode</Label>
                  <Input
                    id="driverPincode"
                    type="number"
                    onChange={(e) => {
                      const pincode = e.target.value;
                      setFormData({ ...formData, pincode });
                      fetchAddressByPincode(pincode); // Fetch address
                    }}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    readOnly
                    placeholder="Auto-filled Address"
                  />
                </div>
                <div>
                  <Label htmlFor="availability">Availability Time Slots</Label>
                  <select
                    id="availability"
                    className="w-full px-3 py-2 border rounded-md"
                    onChange={(e) =>
                      setFormData({ ...formData, availability: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Time Slot</option>
                    <option value="9AM-12PM">9 AM - 12 PM</option>
                    <option value="12PM-3PM">12 PM - 3 PM</option>
                    <option value="3PM-6PM">3 PM - 6 PM</option>
                    <option value="6PM-9PM">6 PM - 9 PM</option>
                  </select>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full">
              Complete Registration
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
