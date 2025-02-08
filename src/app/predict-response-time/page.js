"use client"
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Clock, AlertTriangle, Car, MapPin } from "lucide-react";

const PredictiveResponse = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedZone, setSelectedZone] = useState("Central Zone");
  const [isClient, setIsClient] = useState(false);

 

  
  // Dummy data for different zones
  const zoneData = {
    "Central Zone": { current: 8, usual: 12, traffic: "Low" },
    "North Zone": { current: 15, usual: 12, traffic: "High" },
    "South Zone": { current: 10, usual: 12, traffic: "Moderate" },
    "East Zone": { current: 11, usual: 12, traffic: "Moderate" },
    "West Zone": { current: 9, usual: 12, traffic: "Low" },
  };

  // Dummy historical data for the chart
  const historicalData = [
    { time: "6 AM", responseTime: 8 },
    { time: "9 AM", responseTime: 15 },
    { time: "12 PM", responseTime: 12 },
    { time: "3 PM", responseTime: 10 },
    { time: "6 PM", responseTime: 14 },
    { time: "9 PM", responseTime: 9 },
  ];

  // Update current time every minute

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  
  if (!isClient) return null;

  const getTrafficColor = (traffic) => {
    switch (traffic.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Response Time Prediction</h1>
        <p className="text-gray-500">
          Real-time emergency response predictions based on current conditions
        </p>
      </div>

      {/* Current Time and Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(zoneData).map(([zone, data]) => (
          <Card
            key={zone}
            className={`cursor-pointer transition-all ${
              selectedZone === zone ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setSelectedZone(zone)}
          >
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{zone}</p>
                    <p className="text-2xl font-bold">{data.current} min</p>
                  </div>
                  <Badge className={getTrafficColor(data.traffic)}>
                    {data.traffic} Traffic
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Current</span>
                    <span>Usual</span>
                  </div>
                  <Progress value={(data.current / data.usual) * 100} />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{data.current} min</span>
                    <span>{data.usual} min</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Response Time Trend */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Response Time Trend</CardTitle>
            <CardDescription>
              Historical response times over the day
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ fill: "#2563eb" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Current Status */}
        <Card>
          <CardHeader>
            <CardTitle>Current Status</CardTitle>
            <CardDescription>
              {currentTime.toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Average Response Time</span>
              </div>
              <p className="text-2xl font-bold">
                {zoneData[selectedZone].current} minutes
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Car className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Traffic Condition</span>
              </div>
              <Badge
                className={getTrafficColor(zoneData[selectedZone].traffic)}
              >
                {zoneData[selectedZone].traffic}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Selected Area</span>
              </div>
              <p className="text-gray-600">{selectedZone}</p>
            </div>

            {zoneData[selectedZone].traffic === "High" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-700">
                  High traffic alert in this zone. Consider alternative routes.
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictiveResponse;
