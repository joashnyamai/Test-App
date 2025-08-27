import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HiEye, HiEyeOff, HiMail, HiKey, HiSparkles } from "react-icons/hi";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";

export const Signup = () => {
  const navigate = useNavigate();
  const { login, addUser } = useUserStore();
  const [isLogin, setIsLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Signup form state
  const [signupForm, setSignupForm] = useState({ 
    fullName: "", 
    email: "", 
    password: "", 
    role: "", // Add role property
  });

  // Login form state
  const [loginForm, setLoginForm] = useState({ 
    email: "", 
    password: "" 
  });

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    
    // Basic validation
    if (!signupForm.fullName || !signupForm.email || !signupForm.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (signupForm.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    // Add user to store
    addUser({
      firstName: signupForm.fullName.split(' ')[0],
      lastName: signupForm.fullName.split(' ').slice(1).join(' ') || "User",
      username: signupForm.email.split('@')[0],
      email: signupForm.email,
      password: signupForm.password,
      role: signupForm.role || "QA Tester, Developer, Project Manager",   // Use selected role
    });
    
    
    // Simulate API call
    setTimeout(() => {
      navigate("/dashboard", { replace: true });
      setLoading(false);
    }, 1000);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    if (!loginForm.email || !loginForm.password) {
      setError("Email and Password are required");
      setLoading(false);
      return;
    }

    const success = login(loginForm.email, loginForm.password);
    if (success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
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
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-center md:text-left">
                {isLogin ? "Sign in to your account to continue" : "Fill in the details to sign up"}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 pb-0 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {!isLogin ? (
                /* SIGNUP FORM */
                <>
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
                  {/* Role Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="role">Select Role</Label>
                    <select id="role"
                    value={signupForm.role || ""}
                    onChange={(e) => setSignupForm({ ...signupForm, role: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
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
                      onClick={() => setIsLogin(true)} 
                      className="text-green-600 hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </>
              ) : (
                /* LOGIN FORM */
                <>
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">Email</Label>
                    <div className="relative">
                      <HiMail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="loginEmail"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full pl-10"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword">Password</Label>
                    <div className="relative">
                      <HiKey className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="loginPassword"
                        type={passwordVisible ? "text" : "password"}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-10"
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

                  {/* Forgot password */}
                  <div className="text-right">
                    <button className="text-sm text-green-600 hover:underline">
                      Forgot password?
                    </button>
                  </div>

                  {/* Login button */}
                  <Button
                    onClick={handleLogin}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
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

                  {/* Signup link */}
                  <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <button 
                      onClick={() => setIsLogin(false)} 
                      className="text-green-600 hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </>
              )}
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};