import React, { useState } from "react";
import { useUserStore } from "@/store/user-store";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Edit,
  Mail,
  User as UserIcon,
  Calendar,
  Save,
  X,
} from "lucide-react";

export const Profile = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
  });

  if (!currentUser) {
    navigate("/login"); // Redirect to login if no user is found
    return null;
  }

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      username: currentUser.username,
      email: currentUser.email,
    });
    setEditMode(false);
  };

  const handleSave = () => {
    console.log("Saving profile...", formData);
    // Here you could call API -> updateUser(formData)
    setEditMode(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">User Profile</h1>
        {editMode ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} className="gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setEditMode(true)}
            className="gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/avatars/01.png" alt={currentUser.firstName} />
                <AvatarFallback className="text-2xl">
                  {getInitials(currentUser.firstName, currentUser.lastName)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl">
              {formData.firstName} {formData.lastName}
            </CardTitle>
            <CardDescription>
              <Badge variant="secondary" className="mt-2">
                {currentUser.role}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{formData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <UserIcon className="w-4 h-4 text-muted-foreground" />
              <span>@{formData.username}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Joined {formatDate(currentUser.createdAt)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your account details and personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  First Name
                </label>
                {editMode ? (
                  <Input
                    value={formData.firstName}
                    onChange={(e) =>
                      handleChange("firstName", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-base font-medium">{formData.firstName}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Name
                </label>
                {editMode ? (
                  <Input
                    value={formData.lastName}
                    onChange={(e) =>
                      handleChange("lastName", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-base font-medium">{formData.lastName}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Username
                </label>
                {editMode ? (
                  <Input
                    value={formData.username}
                    onChange={(e) =>
                      handleChange("username", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-base font-medium">@{formData.username}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                {editMode ? (
                  <Input
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                ) : (
                  <p className="text-base font-medium">{formData.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Role
                </label>
                <p className="text-base font-medium">
                  <Badge variant="outline">{currentUser.role}</Badge>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Member Since
                </label>
                <p className="text-base font-medium">
                  {formatDate(currentUser.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Customize your application preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Edit Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
