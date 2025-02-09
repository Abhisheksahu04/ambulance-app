"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { userDetails, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[200px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Welcome, {userDetails?.name || "User"}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {userDetails?.userType === "patient" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-500">Full Name</h3>
                    <p className="mt-1">{userDetails.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Address</h3>
                    <p className="mt-1">{userDetails.address}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Pincode</h3>
                    <p className="mt-1">{userDetails.pincode}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">
                      Emergency Contact
                    </h3>
                    <p className="mt-1">{userDetails.emergencyContact}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-500">
                      Vehicle Number
                    </h3>
                    <p className="mt-1">{userDetails?.vehicleNumber}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">
                      License Number
                    </h3>
                    <p className="mt-1">{userDetails?.licenseNumber}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Service Area</h3>
                    <p className="mt-1">{userDetails?.serviceArea}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Pincode</h3>
                    <p className="mt-1">{userDetails?.pincode}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Availability</h3>
                    <p className="mt-1">{userDetails?.availability}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
