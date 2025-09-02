import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HiMail, HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { backend_url } from "@/config";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSendResetLink = async () => {
    if (!email) {
      setError("Email address is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const backend_url = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backend_url}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to send reset link. Please try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log(`Reset link sent: ${data.message || "Reset link sent successfully"}`);
      setSent(true);
      
    } catch (err) {
      console.log(`Error: ${err.message}`);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleResendLink = async () => {
    if (!email) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${backend_url}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("Reset link resent successfully");
      }
    } catch (err) {
      console.log(`Error resending link: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Success state - link sent
  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-0">
        <div className="w-full h-screen flex flex-col md:flex-row">
          {/* Left side - Image - Full height and width on desktop */}
          <div className="hidden md:flex md:w-1/2 h-full">
            <img
              src="https://media.istockphoto.com/id/1471444483/photo/customer-satisfaction-survey-concept-users-rate-service-experiences-on-online-application.jpg?b=1&s=612x612&w=0&k=20&c=2Wtg2ur5qT3ZFazgxIJYmkPD1ds8p_IVMmrABjZ4NOM="
              alt="Email sent illustration"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Success message */}
          <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8">
            <div className="w-full max-w-md">
              <CardContent className="px-0 pb-0 text-center space-y-6">
                <div className="text-green-600 text-6xl mb-4">✓</div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Check Your Email
                </CardTitle>
                <CardDescription className="text-gray-600">
                  We've sent a password reset link to <strong className="text-gray-900">{email}</strong>
                </CardDescription>
                
                <div className="text-center">
                  <button 
                    onClick={handleResendLink}
                    className="text-sm text-green-600 hover:underline"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Didn't receive it? Resend link"}
                  </button>
                </div>

                <Button
                  onClick={handleBackToLogin}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <HiArrowLeft className="mr-2 h-4 w-4" />
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
            alt="Forgot password illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Form - Full height and width on desktop */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl font-bold text-center md:text-left">
                Forgot Password
              </CardTitle>
              <CardDescription className="text-center md:text-left">
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <HiMail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10"
                  />
                </div>
              </div>

              <Button
                onClick={handleSendResetLink}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>

              <Button
                onClick={handleBackToLogin}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <HiArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};