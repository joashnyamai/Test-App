import React, { useState, useEffect } from "react";
import {
  Edit,
  Mail,
  User,
  Save,
  X,
  Camera,
  Shield,
  Bell,
  Palette,
  Phone,
  MapPin,
  Briefcase,
  Eye,
  EyeOff,
  Moon,
  Sun,
} from "lucide-react";
import { useUserStore } from "@/store/user-store";

// Theme context
const ThemeContext = React.createContext<{ theme: string; toggleTheme: () => void } | null>(null);

const Profile = () => {
  const { currentUser, updateCurrentUser } = useUserStore();
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    location: currentUser?.location || "",
    bio: currentUser?.bio || "",
    company: currentUser?.company || "",
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Update formData when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        username: currentUser.username || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        location: currentUser.location || "",
        bio: currentUser.bio || "",
        company: currentUser.company || "",
      });
    }
  }, [currentUser]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      username: currentUser.username,
      email: currentUser.email,
      phone: currentUser.phone,
      location: currentUser.location,
      bio: currentUser.bio,
      company: currentUser.company,
    });
    setEditMode(false);
  };

  const handleSave = () => {
    updateCurrentUser({
      ...currentUser,
      ...formData,
      lastActive: new Date(),
    });
    setTimeout(() => setEditMode(false), 1000);
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      >
        <div className="container mx-auto p-6 max-w-6xl">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "dark" ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-yellow-400"
              }`}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Header */}
          <div
            className={`relative rounded-2xl p-8 mb-8 text-white overflow-hidden ${
              theme === "dark"
                ? "bg-gradient-to-r from-gray-800 via-purple-900 to-indigo-900"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
            }`}
          >
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {/* Profile Image */}
                <div className="relative group">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden ${
                      theme === "dark"
                        ? "bg-white/10 backdrop-blur-sm border-4 border-white/20"
                        : "bg-white/20 backdrop-blur-sm border-4 border-white/30"
                    }`}
                  >
                    {currentUser.profileImage ? (
                      <img
                        src={currentUser.profileImage}
                        alt={currentUser.firstName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white">
                        {getInitials(currentUser.firstName, currentUser.lastName)}
                      </span>
                    )}
                  </div>
                  {editMode && (
                    <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                    </button>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {formData.firstName} {formData.lastName}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-white/90">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        theme === "dark" ? "bg-white/10" : "bg-white/20"
                      }`}
                    >
                      {currentUser.role}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Active {formatLastActive(currentUser.lastActive)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              {editMode ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      theme === "dark"
                        ? "bg-white/10 hover:bg-white/20"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 hover:bg-white/90 rounded-lg transition-colors font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    theme === "dark"
                      ? "bg-white/10 hover:bg-white/20"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? theme === "dark"
                      ? "bg-purple-700 text-white"
                      : "bg-purple-200 text-purple-800"
                    : theme === "dark"
                    ? "bg-white/10 text-gray-300 hover:bg-white/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            {activeTab === "personal" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    disabled={!editMode}
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    disabled={!editMode}
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    disabled={!editMode}
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Email Verified</span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      currentUser.isEmailVerified ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Phone Verified</span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      currentUser.isPhoneVerified ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Two-Factor Auth</span>
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div>
                <p className="text-gray-600 dark:text-gray-400">User preferences will go here.</p>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  Notification settings will go here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Profile;
