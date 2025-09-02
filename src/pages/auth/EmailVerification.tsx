import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";
import { backend_url } from "@/config";

export const EmailVerification = () => {
  const navigate = useNavigate();
  const { 
    getTempUserData, 
    getTempUserEmail, 
    clearTempUserData, 
    addUser, 
    verifyUserEmail,
    getUserByEmail 
  } = useUserStore();
  
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Get the email from temp user data when component mounts
  useEffect(() => {
    const email = getTempUserEmail();
    if (email) {
      setUserEmail(email);
    } else {
      // No temp data found, redirect to signup
      setError("No signup data found. Please sign up again.");
      setTimeout(() => {
        navigate("/signup", { replace: true });
      }, 2000);
    }
  }, [getTempUserEmail, navigate]);

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

    if (!userEmail) {
      setError("Email not found. Please try signing up again.");
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
          email: userEmail,
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
      
      // Get temp user data and create the user in store
      const tempUserData = getTempUserData();
      if (tempUserData) {
        // Split full name into first and last name
        const nameParts = tempUserData.fullName.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        // Create user object for the store
        const newUser = {
          firstName,
          lastName,
          username: tempUserData.username,
          email: tempUserData.email,
          password: tempUserData.password,
          role: tempUserData.role,
          isEmailVerified: true, // Mark as verified
          isPhoneVerified: false,
          lastActive: new Date(),
          phoneVerifiedDate: new Date(),
          emailVerifiedDate: new Date(),
        };
        
        // Add user to store
        addUser(newUser);
        
        // Mark user as email verified (in case user already exists)
        verifyUserEmail(userEmail);
        
        // Clear temporary data
        clearTempUserData();
        
        // Navigate to login
        navigate("/login", { replace: true });
      } else {
        // If no temp data, just mark existing user as verified
        verifyUserEmail(userEmail);
        navigate("/login", { replace: true });
      }
      
    } catch (err) {
      console.log(`Error: ${err.message}`);
      setError("An error occurred during verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // Clear temp data and go to login
    clearTempUserData();
    navigate("/login");
  };

  const handleBackToSignup = () => {
    // Clear temp data and go to signup
    clearTempUserData();
    navigate("/signup");
  };

  const handleResendCode = async () => {
    if (!userEmail) {
      setError("Email not found. Please try signing up again.");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${backend_url}/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        // Show success message
        console.log("Verification code resent successfully");
        // You might want to show a success toast here
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to resend verification code");
      }
    } catch (err) {
      console.log(`Error resending code: ${err.message}`);
      setError("An error occurred while resending the code");
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
                {userEmail ? (
                  <>Enter the 6-digit code sent to <span className="font-medium">{userEmail}</span></>
                ) : (
                  "Enter the 6-digit code sent to your email address."
                )}
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
                disabled={loading || !userEmail}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </Button>

              <div className="text-center">
                <button 
                  onClick={handleResendCode}
                  className="text-sm text-green-600 hover:underline"
                  disabled={loading || !userEmail}
                >
                  Didn't receive the code? Resend
                </button>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleBackToSignup}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <HiArrowLeft className="mr-2 h-4 w-4" />
                  Back to Signup
                </Button>
                
                <Button
                  onClick={handleBackToLogin}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};