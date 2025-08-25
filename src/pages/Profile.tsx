import React from 'react';
import { useUserStore } from '@/store/user-store';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Mail, User as UserIcon, Calendar } from 'lucide-react';

export const Profile = () => {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login'); // Redirect to login if no user is found
    return null;
  }

  // Generate initials for avatar fallback
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <Button variant="outline" className="gap-2">
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
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
              {currentUser.firstName} {currentUser.lastName}
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
              <span>{currentUser.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <UserIcon className="w-4 h-4 text-muted-foreground" />
              <span>@{currentUser.username}</span>
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
                <label className="text-sm font-medium text-muted-foreground">First Name</label>
                <p className="text-base font-medium">{currentUser.firstName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                <p className="text-base font-medium">{currentUser.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Username</label>
                <p className="text-base font-medium">@{currentUser.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <p className="text-base font-medium">{currentUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Role</label>
                <p className="text-base font-medium">
                  <Badge variant="outline">{currentUser.role}</Badge>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <p className="text-base font-medium">{formatDate(currentUser.createdAt)}</p>
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
