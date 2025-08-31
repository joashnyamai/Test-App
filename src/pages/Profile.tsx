import React, { useState, useEffect, useRef } from "react";
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
  Globe,
  Check,
  Upload,
  Trash2,
  Lock,
  Unlock,
  ChevronRight,
  Key,
  CheckCircle,
  XCircle,
  Clock,
  Languages,
  Settings,
} from "lucide-react";
import { useUserStore } from "@/store/user-store";

// Theme context
const ThemeContext = React.createContext<{ theme: string; toggleTheme: () => void } | null>(null);

const Profile = () => {
  const { currentUser, updateCurrentUser } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage || "");
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    location: currentUser?.location || "",
    bio: currentUser?.bio || "",
    company: currentUser?.company || "",
    password: "",
    language: "English",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        username: currentUser.username || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        location: currentUser.location || "",
        bio: currentUser.bio || "",
        company: currentUser.company || "",
      }));
      setProfileImage(currentUser.profileImage || "");
    }
  }, [currentUser]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    if (currentUser) {
      setFormData({
        ...formData,
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
    setProfileImage(currentUser?.profileImage || "");
    setImagePreview("");
    setEditMode(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateCurrentUser({
        ...currentUser,
        ...formData,
        profileImage: imagePreview || profileImage,
        lastActive: new Date(),
      });
      
      setIsSaving(false);
      setSaveSuccess(true);
      setEditMode(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage("");
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      >
        <div className="container mx-auto p-4 md:p-6 max-w-6xl">
          {/* Save Success Notification */}
          {saveSuccess && (
            <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
              <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Profile updated successfully!</span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Profile Settings</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your account information and preferences
              </p>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 ${
                theme === "dark" 
                  ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300" 
                  : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Profile Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Overview */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div
                className={`relative rounded-2xl p-6 text-white overflow-hidden transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-gray-800 via-purple-900 to-indigo-900"
                    : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
                }`}
              >
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex flex-col items-center text-center mb-6">
                    {/* Profile Image */}
                    <div className="relative group mb-4">
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-white/10 backdrop-blur-sm border-4 border-white/20"
                            : "bg-white/20 backdrop-blur-sm border-4 border-white/30"
                        }`}
                      >
                        {imagePreview || profileImage ? (
                          <img
                            src={imagePreview || profileImage}
                            alt={`${currentUser.firstName} ${currentUser.lastName}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white">
                            {getInitials(currentUser.firstName, currentUser.lastName)}
                          </span>
                        )}
                      </div>
                      
                      {editMode && (
                        <>
                          <button 
                            className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Camera className="w-6 h-6 text-white" />
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                          {(imagePreview || profileImage) && (
                            <button
                              onClick={removeProfileImage}
                              className="absolute -bottom-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors duration-300"
                              aria-label="Remove profile image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    
                    <h1 className="text-2xl font-bold mb-1">
                      {formData.firstName} {formData.lastName}
                    </h1>
                    <p className="text-white/80 mb-3">{currentUser.email}</p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          theme === "dark" ? "bg-white/10" : "bg-white/20"
                        }`}
                      >
                        {currentUser.role}
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Active {formatLastActive(currentUser.lastActive)}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  {editMode ? (
                    <div className="flex gap-3 flex-wrap justify-center">
                      <button
                        onClick={handleCancel}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
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
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 hover:bg-white/90 rounded-lg transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditMode(true)}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors duration-300 ${
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

              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account Overview
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Member since</span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {new Date(currentUser.createdAt || new Date()).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Last login</span>
                    <span className="text-gray-800 dark:text-white font-medium">
                      {formatLastActive(currentUser.lastActive)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <div className="flex gap-1 mb-2 overflow-x-auto pb-2 bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? theme === "dark"
                          ? "bg-purple-700 text-white shadow-md"
                          : "bg-purple-100 text-purple-800 shadow-sm"
                        : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-700/50"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-1" />}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-all duration-300">
                {/* PERSONAL INFO */}
                {activeTab === "personal" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="First Name"
                        value={formData.firstName}
                        onChange={(v) => handleChange("firstName", v)}
                        disabled={!editMode}
                      />
                      <InputField
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(v) => handleChange("lastName", v)}
                        disabled={!editMode}
                      />
                      <InputField
                        label="Username"
                        value={formData.username}
                        onChange={(v) => handleChange("username", v)}
                        disabled={!editMode}
                        icon={<User className="w-4 h-4" />}
                      />
                      <InputField
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(v) => handleChange("email", v)}
                        disabled={!editMode}
                        icon={<Mail className="w-4 h-4" />}
                      />
                      <InputField
                        label="Phone"
                        value={formData.phone}
                        onChange={(v) => handleChange("phone", v)}
                        disabled={!editMode}
                        icon={<Phone className="w-4 h-4" />}
                      />
                      <InputField
                        label="Location"
                        value={formData.location}
                        onChange={(v) => handleChange("location", v)}
                        disabled={!editMode}
                        icon={<MapPin className="w-4 h-4" />}
                      />
                      <InputField
                        label="Company"
                        value={formData.company}
                        onChange={(v) => handleChange("company", v)}
                        disabled={!editMode}
                        icon={<Briefcase className="w-4 h-4" />}
                        className="md:col-span-2"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        disabled={!editMode}
                        value={formData.bio}
                        onChange={(e) => handleChange("bio", e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Tell us a little about yourself..."
                      />
                    </div>
                  </div>
                )}

                {/* SECURITY */}
                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Key className="w-5 h-5" />
                        Change Password
                      </h3>
                      <div className="relative mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            disabled={!editMode}
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          Use at least 8 characters with a mix of letters, numbers & symbols
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Security Status
                      </h3>
                      <div className="space-y-3">
                        <VerifyStatus 
                          label="Email Verified" 
                          status={currentUser.isEmailVerified} 
                          verifiedDate={currentUser.emailVerifiedDate}
                        />
                        <VerifyStatus 
                          label="Phone Verified" 
                          status={currentUser.isPhoneVerified} 
                          verifiedDate={currentUser.phoneVerifiedDate}
                        />
                        <VerifyStatus 
                          label="Two-Factor Authentication" 
                          status={false} 
                          actionLabel="Enable"
                          onAction={() => console.log("Enable 2FA")}
                        />
                      </div>
                    </div>
                    
                    {editMode && (
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors duration-300 p-2">
                          <Trash2 className="w-4 h-4" />
                          Delete Account
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* PREFERENCES */}
                {activeTab === "preferences" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <Languages className="w-4 h-4" />
                          Language
                        </label>
                        <select
                          disabled={!editMode}
                          value={formData.language}
                          onChange={(e) => handleChange("language", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                          <option value="Japanese">Japanese</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Timezone
                        </label>
                        <select
                          disabled={!editMode}
                          value={formData.timezone}
                          onChange={(e) => handleChange("timezone", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="UTC">UTC</option>
                          <option value="EST">Eastern Time (EST)</option>
                          <option value="PST">Pacific Time (PST)</option>
                          <option value="CET">Central European Time (CET)</option>
                          <option value="JST">Japan Standard Time (JST)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Appearance
                      </h3>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-700">
                        <div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">Dark Mode</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {theme === "dark" ? "Currently enabled" : "Currently disabled"}
                          </p>
                        </div>
                        <button
                          onClick={toggleTheme}
                          className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${
                            theme === "dark" ? "bg-purple-600 justify-end" : "bg-gray-400 justify-start"
                          }`}
                        >
                          <div className="w-5 h-5 bg-white rounded-full shadow mx-0.5"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* NOTIFICATIONS */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notification Preferences
                    </h3>
                    
                    <div className="space-y-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-700">
                      <ToggleSwitch
                        label="Email Notifications"
                        description="Receive updates, news, and marketing emails"
                        checked={formData.notifications.email}
                        onChange={(v) =>
                          handleChange("notifications", { ...formData.notifications, email: v })
                        }
                        disabled={!editMode}
                      />
                      
                      <ToggleSwitch
                        label="SMS Notifications"
                        description="Get important updates via text message"
                        checked={formData.notifications.sms}
                        onChange={(v) =>
                          handleChange("notifications", { ...formData.notifications, sms: v })
                        }
                        disabled={!editMode}
                      />
                      
                      <ToggleSwitch
                        label="Push Notifications"
                        description="Receive browser notifications"
                        checked={formData.notifications.push}
                        onChange={(v) =>
                          handleChange("notifications", { ...formData.notifications, push: v })
                        }
                        disabled={!editMode}
                      />
                    </div>
                    
                    {editMode && (
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline transition-colors duration-300 flex items-center gap-1">
                          Configure notification preferences in detail
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

/* ---------- Reusable Components ---------- */
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  disabled,
  icon,
  className = "",
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  icon?: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400 mt-1">
          {icon}
        </div>
      )}
      <input
        type={type}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
          icon ? "pl-10 pr-4" : "px-4"
        }`}
      />
    </div>
  </div>
);

const VerifyStatus = ({ 
  label, 
  status, 
  verifiedDate,
  actionLabel,
  onAction 
}: { 
  label: string; 
  status: boolean;
  verifiedDate?: Date;
  actionLabel?: string;
  onAction?: () => void;
}) => (
  <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-600 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-full ${status ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
        {status ? (
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
        )}
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        {status && verifiedDate && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Verified on {new Date(verifiedDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
    <div className="flex items-center gap-3">
      {!status && actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium px-3 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  </div>
);

const ToggleSwitch = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-600">
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      {description && (
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</span>
      )}
    </div>
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        checked ? 'bg-purple-600' : 'bg-gray-400'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

export default Profile;