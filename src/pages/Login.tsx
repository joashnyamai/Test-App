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

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // new states for reset
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    if (!form.email || !form.password) {
      setError("Email and Password are required");
      setLoading(false);
      return;
    }

    const success = login(form.email, form.password);
    if (success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setResetMessage("Please enter your email");
      return;
    }
    // mock reset function
    // connect this to backend or Firebase later
    setResetMessage("If an account exists, a reset link has been sent to " + resetEmail);
    setResetEmail("");
    setResetMode(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-20 dark:opacity-10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob dark:bg-blue-800 dark:opacity-20"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:bg-purple-800 dark:opacity-20"></div>
      <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:bg-pink-800 dark:opacity-20"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 dark:border-gray-700">
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
              {resetMode ? "Reset Password" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              {resetMode
                ? "Enter your email to reset your password"
                : "Sign in to your account to continue"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!resetMode ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
                  <div className="relative">
                    <HiMail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="pl-10 pr-4 py-6 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
                  <div className="relative">
                    <HiKey className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="pl-10 pr-12 py-6 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {passwordVisible ? <HiEyeOff className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded-md"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Forgot password link */}
                <p className="text-sm text-right">
                  <button
                    onClick={() => setResetMode(true)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    Forgot password?
                  </button>
                </p>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleLogin}
                    className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
                <div className="relative">
                  <HiMail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="pl-10 pr-4 py-6 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>

                {resetMessage && (
                  <p className="text-sm text-green-600 dark:text-green-400">{resetMessage}</p>
                )}

                <div className="flex gap-2">
                  <Button onClick={handleResetPassword} className="w-full bg-blue-600 text-white">
                    Reset Password
                  </Button>
                  <Button variant="outline" onClick={() => setResetMode(false)} className="w-full">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Social login & signup remain the same */}
          </CardContent>
        </Card>
      </motion.div>

      {/* Theme toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {darkMode ? "🌙" : "☀️"}
      </button>
    </div>
  );
};
