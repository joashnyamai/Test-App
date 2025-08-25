import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user-store";

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
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md p-8 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <Label>Username</Label>
            <Input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="relative">
            <Label>Password</Label>
            <Input
              type={passwordVisible ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-2 top-9">
              {passwordVisible ? <HiEyeOff /> : <HiEye />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="relative">
            <Label>Confirm Password</Label>
            <Input
              type={passwordVisible ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <div>
            <Label>Role</Label>
            <Select 
              value={form.role} 
              onValueChange={(value) => setForm({ ...form, role: value })} 
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="QA Tester">QA Tester</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Project Manager">Project Manager</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={form.agreeToTerms}
              onChange={(e) => setForm({ ...form, agreeToTerms: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the <span className="text-blue-600 cursor-pointer">Terms and Conditions</span> and <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
            </label>
          </div>
          {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

          <Button onClick={handleSignup} className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          <div className="flex justify-center gap-3 mt-4">
            <Button variant="outline" size="icon"><FaGithub /></Button>
            <Button variant="outline" size="icon"><FaLinkedin /></Button>
            <Button variant="outline" size="icon"><FaGoogle /></Button>
          </div>

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};
