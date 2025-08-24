import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme based on darkMode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogin = () => {
    if (!form.email || !form.password) {
      alert("Email and Password are required");
      return;
    }
    localStorage.setItem("token", "dummy-token");
    navigate("/", { replace: true });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md p-8 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <div className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="relative">
            <Label>Password</Label>
            <Input
              type={passwordVisible ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-2 top-9"
            >
              {passwordVisible ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>

          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>

          <div className="flex justify-center gap-3 mt-4">
            <Button variant="outline" size="icon"><FaGithub /></Button>
            <Button variant="outline" size="icon"><FaLinkedin /></Button>
            <Button variant="outline" size="icon"><FaGoogle /></Button>
          </div>

          <p className="text-sm text-center mt-2">
            Don’t have an account?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
