import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Profile Updated",
    message: "Your profile information was updated successfully.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "warning",
    title: "Password Expiry",
    message: "Your password will expire in 5 days. Please update it soon.",
    time: "1 day ago",
  },
  {
    id: 3,
    type: "info",
    title: "New Feature",
    message: "Dark mode is now available in your preferences.",
    time: "3 days ago",
  },
];

export const Notifications = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="w-6 h-6" />
          Notifications
        </h1>
        <Button variant="outline">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <Card key={n.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                {n.type === "success" && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {n.type === "warning" && (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                )}
                {n.type === "info" && (
                  <Info className="w-5 h-5 text-blue-500" />
                )}
                <CardTitle>{n.title}</CardTitle>
              </div>
              <Badge variant="secondary">{n.time}</Badge>
            </CardHeader>
            <CardContent>
              <CardDescription>{n.message}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
