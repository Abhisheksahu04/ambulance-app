"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { userDetails, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 p-8">
        <Card className="w-full max-w-lg bg-slate-900/40 border border-slate-700/50">
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 p-8">
      <Card className="w-full max-w-lg bg-slate-900/40 border border-slate-700/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Welcome, {userDetails?.name || "User"}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {userDetails?.userType === "patient" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem title="Full Name" value={userDetails.name} />
                <InfoItem title="Address" value={userDetails.address} />
                <InfoItem title="Pincode" value={userDetails.pincode} />
                <InfoItem
                  title="Emergency Contact"
                  value={userDetails.emergencyContact}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  title="Vehicle Number"
                  value={userDetails?.vehicleNumber}
                />
                <InfoItem
                  title="License Number"
                  value={userDetails?.licenseNumber}
                />
                <InfoItem
                  title="Service Area"
                  value={userDetails?.serviceArea}
                />
                <InfoItem title="Pincode" value={userDetails?.pincode} />
                <InfoItem
                  title="Availability"
                  value={userDetails?.availability}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Link href="/">
        <Button className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-xl shadow-lg">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};

const InfoItem = ({ title, value }) => (
  <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl shadow-md">
    <h3 className="font-medium text-slate-400">{title}</h3>
    <p className="mt-1 text-white">{value || "N/A"}</p>
  </div>
);

export default Dashboard;
