"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const RegistrationForm = () => {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({});
  const { updateUserDetails } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserDetails({
        userType,
        ...formData,
      });
      console.log("User details saved successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
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
                  <Label htmlFor="serviceArea">Service Area</Label>
                  <Input
                    id="serviceArea"
                    onChange={(e) =>
                      setFormData({ ...formData, serviceArea: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="driverPincode">Pincode</Label>
                  <Input
                    id="driverPincode"
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="availability">Availability Time Slots</Label>
                  <Input
                    id="availability"
                    onChange={(e) =>
                      setFormData({ ...formData, availability: e.target.value })
                    }
                    placeholder="e.g., 9 AM - 5 PM"
                    required
                  />
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
