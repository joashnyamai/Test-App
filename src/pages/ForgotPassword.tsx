import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HiMail, HiArrowLeft, HiCheckCircle, HiRefresh } from "react-icons/hi";


export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const navigate = useNavigate();

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setCaptchaInput("");
  };

  // Initialize captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleResetPassword = async () => {
    setLoading(true);
    setError("");

    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Captcha validation
    if (!captchaInput) {
      setError("Please enter the captcha");
      setLoading(false);
      return;
    }

    if (captchaInput !== captchaText) {
      setError("Captcha is incorrect. Please try again.");
      generateCaptcha(); // Generate new captcha on failure
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically call your password reset API
      // await resetPassword(email);
      
      setSuccess(true);
    } catch (err) {
      console.log(`Error: ${err.message}`);
      setError("An error occurred. Please try again.");
      generateCaptcha(); // Generate new captcha on error
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate("/login")
  };

  const handleTryAgain = () => {
    setSuccess(false);
    setEmail("");
    setError("");
    setCaptchaInput("");
    generateCaptcha();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-0">
      <div className="w-full h-screen flex flex-col md:flex-row">
        {/* Left side - Image - Full height and width on desktop */}
        <div className="hidden md:flex md:w-1/2 h-full">
          <img
            src="https://media.istockphoto.com/id/1471444483/photo/customer-satisfaction-survey-concept-users-rate-service-experiences-on-online-application.jpg?b=1&s=612x612&w=0&k=20&c=2Wtg2ur5qT3ZFazgxIJYmkPD1ds8p_IVMmrABjZ4NOM="
            alt="Smart farming illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Form - Full height and width on desktop */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            {!success ? (
              <>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-bold text-center md:text-left">
                    Forgot Password?
                  </CardTitle>
                  <CardDescription className="text-center md:text-left">
                    Enter your email address and we'll send you a link to reset your password
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-0 pb-0 space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="resetEmail">Email</Label>
                    <div className="relative">
                      <HiMail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="resetEmail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-10"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Captcha */}
                  <div className="space-y-2">
                    <Label>Security Verification</Label>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="flex-1 bg-gray-100 border-2 border-gray-300 rounded-md p-3 text-center font-mono text-lg tracking-widest select-none"
                        style={{
                          background: 'linear-gradient(45deg, #f0f0f0 25%, #e8e8e8 25%, #e8e8e8 50%, #f0f0f0 50%, #f0f0f0 75%, #e8e8e8 75%)',
                          backgroundSize: '10px 10px',
                          letterSpacing: '3px',
                          textDecoration: 'line-through',
                          textDecorationColor: '#999',
                          transform: 'skew(-5deg)',
                          color: '#333'
                        }}
                      >
                        {captchaText}
                      </div>
                      <Button
                        type="button"
                        onClick={generateCaptcha}
                        size="sm"
                        variant="outline"
                        className="p-2"
                        disabled={loading}
                      >
                        <HiRefresh className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Enter the characters shown above"
                      className="w-full"
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500">
                      Enter the characters as shown above (case sensitive)
                    </p>
                  </div>

                  {/* Reset button */}
                  <Button
                    onClick={handleResetPassword}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>

                  {/* Back to login */}
                  <div className="text-center pt-4">
                    <button 
                      onClick={navigateToLogin}
                      className="inline-flex items-center text-sm text-green-600 hover:underline"
                    >
                      <HiArrowLeft className="mr-1 h-4 w-4" />
                      Back to Sign In
                    </button>
                  </div>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="px-0 pt-0 text-center">
                  <div className="flex justify-center mb-4">
                    <HiCheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    Check Your Email
                  </CardTitle>
                  <CardDescription>
                    We've sent a password reset link to <strong>{email}</strong>
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-0 pb-0 space-y-4">
                  <div className="bg-green-50 text-green-700 p-4 rounded-md text-sm text-center">
                    <p className="mb-2">
                      Please check your email and click the link to reset your password.
                    </p>
                    <p className="text-xs text-green-600">
                      Don't forget to check your spam folder if you don't see the email.
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={navigateToLogin}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Back to Sign In
                    </Button>
                    
                    <Button
                      onClick={handleTryAgain}
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Try Different Email
                    </Button>
                  </div>

                  {/* Resend link */}
                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Didn't receive the email?
                    </p>
                    <button 
                      onClick={handleResetPassword}
                      className="text-sm text-green-600 hover:underline font-medium"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Resend email"}
                    </button>
                  </div>
                </CardContent>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};