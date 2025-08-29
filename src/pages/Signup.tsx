import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";

export const Signup = () => {
  const navigate = useNavigate();
  const { addUser } = useUserStore();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Signup form state
  const [signupForm, setSignupForm] = useState({ 
    fullName: "", 
    username: "",
    email: "", 
    password: "", 
    confirmPassword: "",
    role: "", 
  });

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    
    // Basic validation
    if (!signupForm.fullName || !signupForm.username || !signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.role) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (signupForm.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupForm.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Add user to store
    addUser({
      firstName: signupForm.fullName.split(' ')[0],
      lastName: signupForm.fullName.split(' ').slice(1).join(' ') || "User",
      username: signupForm.username,
      email: signupForm.email,
      password: signupForm.password,
      role: signupForm.role || "QA Tester",
    });
    
    // Simulate API call
    setTimeout(() => {
      navigate("/login", { replace: true });
      setLoading(false);
    }, 1000);
  };

  const navigateToLogin = () => {
    navigate("/login");
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
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl font-bold text-center md:text-left">
                Create Account
              </CardTitle>
              <CardDescription className="text-center md:text-left">
                Fill in the details to sign up
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={signupForm.fullName}
                  onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full"
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={signupForm.username}
                  onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                  placeholder="Choose a username"
                  className="w-full"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    placeholder="Create a password"
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {passwordVisible ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={passwordVisible ? "text" : "password"}
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                    placeholder="Confirm your password"
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {passwordVisible ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Select Role</Label>
                <select 
                  id="role"
                  value={signupForm.role || ""}
                  onChange={(e) => setSignupForm({ ...signupForm, role: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>Select your role</option>
                  <option value="QA Tester">QA Tester</option>
                  <option value="Developer">Developer</option>
                  <option value="Project Manager">Project Manager</option>
                </select>
              </div>

              {/* Signup button */}
              <Button
                onClick={handleSignup}
                className="w-full mt-2 bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              {/* Divider */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">Or continue with</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Google signin */}
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <FaGoogle className="mr-2 text-blue-500" />
                Continue with Google
              </Button>

              {/* Login link */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <button 
                  onClick={navigateToLogin} 
                  className="text-green-600 hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};