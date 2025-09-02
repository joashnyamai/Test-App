import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";
import { backend_url } from "@/config";

export const EmailVerification = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    
    if (verificationCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${backend_url}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            email: "",
            code: verificationCode 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Invalid verification code. Please try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log(`Email verified successfully: ${data.message || "Email verified!"}`);
      
      // Navigate to login or dashboard after successful verification
      navigate("/login", { replace: true });
      
    } catch (err) {
      console.log(`Error: ${err.message}`);
      setError("An error occurred during verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError("");
    
    try {
      const backend_url = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backend_url}/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Show success message or toast
        console.log("Verification code resent successfully");
      }
    } catch (err) {
      console.log(`Error resending code: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-0">
      <div className="w-full h-screen flex flex-col md:flex-row">
        {/* Left side - Image - Full height and width on desktop */}
        <div className="hidden md:flex md:w-1/2 h-full">
          <img
            src="https://media.istockphoto.com/id/1471444483/photo/customer-satisfaction-survey-concept-users-rate-service-experiences-on-online-application.jpg?b=1&s=612x612&w=0&k=20&c=2Wtg2ur5qT3ZFazgxIJYmkPD1ds8p_IVMmrABjZ4NOM="
            alt="Email verification illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Form - Full height and width on desktop */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl font-bold text-center md:text-left">
                Verify Your Email
              </CardTitle>
              <CardDescription className="text-center md:text-left">
                Enter the 6-digit code sent to your email address.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-bold"
                    maxLength={1}
                  />
                ))}
              </div>

              <Button
                onClick={handleVerify}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </Button>

              <div className="text-center">
                <button 
                  onClick={handleResendCode}
                  className="text-sm text-green-600 hover:underline"
                  disabled={loading}
                >
                  Didn't receive the code? Resend
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
};