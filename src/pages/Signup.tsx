import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HiEye, HiEyeOff, HiMail, HiKey, HiSparkles } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";
import { motion } from "framer-motion";

export const Signup = () => {
  const navigate = useNavigate();
  const { addUser, getUserByEmail } = useUserStore();
  const [form, setForm] = useState({ 
    firstName: "", 
    lastName: "", 
    username: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    role: "QA Tester", // Default role
    agreeToTerms: false
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ 
    firstName: "", 
    lastName: "", 
    username: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    role: "",
    agreeToTerms: ""
  });
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { 
    firstName: "", 
    lastName: "", 
    username: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    role: "",
    agreeToTerms: ""
  };

  if (!form.firstName.trim()) {
    newErrors.firstName = "First name is required"; valid = false;
  }

  if (!form.lastName.trim()) {
    newErrors.lastName = "Last name is required"; valid = false;
  }

  if (!form.username.trim()) {
    newErrors.username = "Username is required"; valid = false;
  } else if (form.username.length < 3) {
    newErrors.username = "Username must be at least 3 characters"; valid = false;
  }

  // Check if email already exists
  const existingUser = getUserByEmail(form.email);
  if (existingUser) {
    newErrors.email = "Email already registered"; valid = false;
  }

  if (!form.email) {
    newErrors.email = "Email is required"; valid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Email is invalid"; valid = false;
  }

  if (!form.password) {
    newErrors.password = "Password is required"; valid = false;
  } else if (form.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters"; valid = false;
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
    newErrors.password = "Password must contain uppercase, lowercase, and number"; valid = false;
  }

  if (form.password !== form.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match"; valid = false;
  }

  if (!form.agreeToTerms) {
    newErrors.agreeToTerms = "You must agree to the terms and conditions"; valid = false;
  }

  setErrors(newErrors);
  return valid;
};

const handleSignup = async () => {
  setLoading(true);
  if (!validateForm()) {
    setLoading(false);
    return;
  }
  
  // Add user to store with role
  addUser({
    firstName: form.firstName,
    lastName: form.lastName,
    username: form.username,
    email: form.email,
    password: form.password,
    role: form.role, // Include role
  });
  
  navigate("/login", { replace: true });
  setLoading(false);
};

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-20 dark:opacity-10"></div>
    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob dark:bg-blue-800 dark:opacity-20"></div>
    <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:bg-purple-800 dark:opacity-20"></div>
    <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:bg-pink-800 dark:opacity-20"></div>

    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="relative z-10 w-full max-w-4xl mx-8"
>
  <Card className="border border-gray-200 dark:border-gray-700 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 p-10">
    <CardHeader className="text-center space-y-2 pb-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto mb-4"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <HiSparkles className="w-8 h-8 text-white" />
        </div>
      </motion.div>
      <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Create Account
      </CardTitle>
      <CardDescription className="text-gray-600 dark:text-gray-300">
        Fill in the details to sign up
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-6"
      >
        {/* First Name */}
        <div>
          <Label className="text-gray-700 dark:text-gray-200">First Name</Label>
          <Input
            type="text"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            placeholder="Enter your first name"
            className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Last Name */}
        <div>
          <Label className="text-gray-700 dark:text-gray-200">Last Name</Label>
          <Input
            type="text"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            placeholder="Enter your last name"
            className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Username */}
        <div>
          <Label className="text-gray-700 dark:text-gray-200">Username</Label>
          <Input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Choose a username"
            className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Email */}
        <div className="col-span-2">
          <Label className="text-gray-700 dark:text-gray-200">Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter your email"
            className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Label className="text-gray-700 dark:text-gray-200">Password</Label>
          <Input
            type={passwordVisible ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Create a password"
            className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-2 top-9 text-gray-600 dark:text-gray-300"
          >
            {passwordVisible ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Label className="text-gray-700 dark:text-gray-200">Confirm Password</Label>
          <Input
            type={passwordVisible ? "text" : "password"}
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            placeholder="Confirm your password"
            className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-2 top-9 text-gray-600 dark:text-gray-300"
          >
            {passwordVisible ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>

        {/* Role */}
        <div>
          <Label className="text-gray-700 dark:text-gray-200">Role</Label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          >
            <option value="QA Tester">QA Tester</option>
            <option value="Developer">Developer</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Designer">Designer</option>
            <option value="IT Support">IT Support</option>
          </select>
        </div>
      </motion.div>

      {/* Terms */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={form.agreeToTerms}
          onChange={(e) => setForm({ ...form, agreeToTerms: e.target.checked })}
          className="w-4 h-4 accent-blue-600 dark:accent-purple-500"
        />
        <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
          I agree to the{" "}
          <span className="text-blue-600 dark:text-purple-400 cursor-pointer">Terms</span> and{" "}
          <span className="text-blue-600 dark:text-purple-400 cursor-pointer">Privacy Policy</span>
        </label>
      </div>

      {/* Signup button */}
      <Button
        onClick={handleSignup}
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Sign Up"}
      </Button>

      {/* Social logins */}
      <div className="flex justify-center gap-3 mt-4">
        <Button variant="outline" size="icon" className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"><FaGithub /></Button>
        <Button variant="outline" size="icon" className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"><FaLinkedin /></Button>
        <Button variant="outline" size="icon" className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"><FaGoogle /></Button>
      </div>

      {/* Login link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 dark:text-purple-400 hover:underline">
          Log in
        </a>
      </p>
    </CardContent>
  </Card>
</motion.div>


    {/* Theme toggle button */}
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  </div>
);
};
