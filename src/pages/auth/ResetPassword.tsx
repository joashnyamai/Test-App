import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HiKey, HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { backend_url } from "@/config";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Get reset token from URL

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      return "Password must contain uppercase, lowercase, number and special character";
    }
    return "";
  };

  const handleReset = async () => {
    if (!passwords.newPassword || !passwords.confirmPassword) {
      setError("Both password fields are required");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordError = validatePassword(passwords.newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (!token) {
      setError("Invalid or expired reset link. Please request a new one.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${backend_url}/auth/reset-password/:token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to reset password. Please try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log(`Password reset successful: ${data.message || "Password updated successfully"}`);
      setSuccess(true);
      
    } catch (err) {
      console.log(`Error: ${err.message}`);
      setError("An error occurred while resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Success state
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-0">
        <div className="w-full h-screen flex flex-col md:flex-row">
          {/* Left side - Image - Full height and width on desktop */}
          <div className="hidden md:flex md:w-1/2 h-full">
            <img
              src="https://media.istockphoto.com/id/1471444483/photo/customer-satisfaction-survey-concept-users-rate-service-experiences-on-online-application.jpg?b=1&s=612x612&w=0&k=20&c=2Wtg2ur5qT3ZFazgxIJYmkPD1ds8p_IVMmrABjZ4NOM="
              alt="Success illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Success message */}
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8">
            <div className="w-full max-w-md">
              <CardContent className="px-0 pb-0 text-center space-y-6">
                <div className="text-green-600 text-6xl mb-4">✓</div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Password Reset Successfully
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Your password has been updated successfully. You can now sign in with your new password.
                </CardDescription>
                
                <Button
                  onClick={handleBackToLogin}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Back to Login
                </Button>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-0">
      <div className="w-full h-screen flex flex-col md:flex-row">
        {/* Left side - Image - Full height and width on desktop */}
        <div className="hidden md:flex md:w-1/2 h-full">
          <img
            src="https://media.istockphoto.com/id/1471444483/photo/customer-satisfaction-survey-concept-users-rate-service-experiences-on-online-application.jpg?b=1&s=612x612&w=0&k=20&c=2Wtg2ur5qT3ZFazgxIJYmkPD1ds8p_IVMmrABjZ4NOM="
            alt="Reset password illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Form - Full height and width on desktop */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl font-bold text-center md:text-left">
                Reset Password
              </CardTitle>
              <CardDescription className="text-center md:text-left">
                Enter your new password below.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <HiKey className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="newPassword"
                    type={showPassword.new ? "text" : "password"}
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    placeholder="New Password"
                    className="w-full pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword.new ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <HiKey className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword.confirm ? "text" : "password"}
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    placeholder="Confirm New Password"
                    className="w-full pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword.confirm ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Password requirements */}
              <div className="text-xs text-gray-500 space-y-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character (!@#$%^&*)</li>
                </ul>
              </div>

              <Button
                onClick={handleReset}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Updating..." : "Set New Password"}
              </Button>

              <div className="text-center">
                <button 
                  onClick={handleBackToLogin}
                  className="text-sm text-green-600 hover:underline"
                >
                  Back to Login
                </button>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};