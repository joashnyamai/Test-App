import React, { useState, useEffect } from "react";
import { 
  Edit, 
  Mail, 
  User, 
  Calendar, 
  Save, 
  X, 
  Camera,
  Shield,
  Bell,
  Palette,
  Globe,
  Phone,
  MapPin,
  Briefcase,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Moon,
  Sun
} from "lucide-react";

// Theme context for dark/light mode
const ThemeContext = React.createContext<{ theme: string; toggleTheme: () => void } | null>(null);

// Mock user store hook with signup data integration
const useUserStore = () => {
  // Try to get user data from localStorage (from signup)
  const getUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem('userData');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  const storedUser = getUserFromStorage();
  
  return {
    currentUser: storedUser || {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      role: "Administrator",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      bio: "Full-stack developer with 5+ years of experience building scalable web applications.",
      company: "Tech Solutions Inc.",
      createdAt: new Date("2023-01-15"),
      lastActive: new Date(),
      profileImage: null,
      isEmailVerified: true,
      isPhoneVerified: false
    }
  };
};

const Profile = () => {
  const { currentUser } = useUserStore();
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
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

  const getInitials = (firstName, lastName) =>
    `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatLastActive = (date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const handleChange = (field, value) => {
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
    console.log("Saving profile...", formData);
    // Save to localStorage to persist changes
    localStorage.setItem('userData', JSON.stringify({
      ...currentUser,
      ...formData,
      lastActive: new Date()
    }));
    
    // Simulate API call
    setTimeout(() => {
      setEditMode(false);
      // Show success message
    }, 1000);
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell }
  ];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}>
        <div className="container mx-auto p-6 max-w-6xl">
          {/* Theme Toggle Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === 'dark' 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'bg-gray-800 text-yellow-400'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Header with gradient */}
          <div className={`relative rounded-2xl p-8 mb-8 text-white overflow-hidden ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-gray-800 via-purple-900 to-indigo-900'
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
          }`}>
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-white/10 backdrop-blur-sm border-4 border-white/20'
                      : 'bg-white/20 backdrop-blur-sm border-4 border-white/30'
                  }`}>
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
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      theme === 'dark' ? 'bg-white/10' : 'bg-white/20'
                    }`}>
                      {currentUser.role}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Active {formatLastActive(currentUser.lastActive)}
                    </span>
                  </div>
                </div>
              </div>
              
              {editMode ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'bg-white/10 hover:bg-white/20'
                        : 'bg-white/20 hover:bg-white/30'
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
                    theme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className={`rounded-xl shadow-sm border mb-6 overflow-hidden ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? theme === 'dark'
                        ? "text-blue-400 border-blue-400 bg-blue-900/20"
                        : "text-blue-600 border-blue-600 bg-blue-50"
                      : theme === 'dark'
                        ? "text-gray-400 border-transparent hover:text-gray-300 hover:bg-gray-700"
                        : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {activeTab === "personal" && (
              <>
                {/* Quick Stats */}
                <div className="lg:col-span-1 space-y-6">
                  <div className={`rounded-xl shadow-sm border p-6 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Quick Info</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className={`flex-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {formData.email}
                        </span>
                        {currentUser.isEmailVerified && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className={`flex-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {formData.phone || "Not provided"}
                        </span>
                        {currentUser.isPhoneVerified ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className={`flex-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {formData.location || "Not provided"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        <span className={`flex-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {formData.company || "Not provided"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className={`flex-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Joined {formatDate(currentUser.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className={`rounded-xl shadow-sm border p-6 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Account Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Email Verified
                        </span>
                        <div className={`w-2 h-2 rounded-full ${currentUser.isEmailVerified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Phone Verified
                        </span>
                        <div className={`w-2 h-2 rounded-full ${currentUser.isPhoneVerified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Two-Factor Auth
                        </span>
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="lg:col-span-2">
                  <div className={`rounded-xl shadow-sm border p-6 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-6 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Personal Information</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            First Name
                          </label>
                          {editMode ? (
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => handleChange("firstName", e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                theme === 'dark'
                                  ? 'bg-gray-700 border-gray-600 text-white'
                                  : 'border-gray-300'
                              }`}
                            />
                          ) : (
                            <p className={`text-base py-2 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{formData.firstName}</p>
                          )}
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Last Name
                          </label>
                          {editMode ? (
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => handleChange("lastName", e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                theme === 'dark'
                                  ? 'bg-gray-700 border-gray-600 text-white'
                                  : 'border-gray-300'
                              }`}
                            />
                          ) : (
                            <p className={`text-base py-2 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{formData.lastName}</p>
                          )}
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Username
                          </label>
                          {editMode ? (
                            <input
                              type="text"
                              value={formData.username}
                              onChange={(e) => handleChange("username", e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                theme === 'dark'
                                  ? 'bg-gray-700 border-gray-600 text-white'
                                  : 'border-gray-300'
                              }`}
                            />
                          ) : (
                            <p className={`text-base py-2 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>@{formData.username}</p>
                          )}
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Email Address
                          </label>
                          {editMode ? (
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange("email", e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                theme === 'dark'
                                  ? 'bg-gray-700 border-gray-600 text-white'
                                  : 'border-gray-300'
                              }`}
                            />
                          ) : (
                            <p className={`text-base py-2 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{formData.email}</p>
                          )}
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Phone Number
                          </label>
                          {editMode ? (
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleChange("phone", e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                theme === 'dark'
                                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                  : 'border-gray-300'
                              }`}
                              placeholder="Enter phone number"
                            />
                          ) : (
                            <p className={`text-base py-2 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{formData.phone || "Not provided"}</p>
                          )}
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Location
                          </label>
                          {editMode ? (
                            <input
                              type="text"
                              value={formData.location}
                              onChange={(e) => handleChange("location", e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                theme === 'dark'
                                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                  : 'border-gray-300'
                              }`}
                              placeholder="Enter location"
                            />
                          ) : (
                            <p className={`text-base py-2 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{formData.location || "Not provided"}</p>
                          )}
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Company
                          </label>
                          {editMode ? (
                            <input
                              type="text"
                              value={formData.company}
                              onChange={(e) => handleChange("company", e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                theme === 'dark'
                                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                  : 'border-gray-300'
                              }`}
                              placeholder="Enter company name"
                            />
                          ) : (
                            <p className={`text-base py-2 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{formData.company || "Not provided"}</p>
                          )}
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Role
                          </label>
                          <div className="py-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              theme === 'dark'
                                ? 'bg-blue-900 text-blue-200'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {currentUser.role}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Bio
                        </label>
                        {editMode ? (
                          <textarea
                            value={formData.bio}
                            onChange={(e) => handleChange("bio", e.target.value)}
                            rows={4}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                              theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'border-gray-300'
                            }`}
                            placeholder="Tell us about yourself..."
                          />
                        ) : (
                          <p className={`text-base py-2 leading-relaxed ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                          }`}>
                            {formData.bio || "No bio provided"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "security" && (
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`rounded-xl shadow-sm border p-6 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Shield className="w-5 h-5 text-blue-600" />
                      Password & Authentication
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 ${
                              theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'border-gray-300'
                            }`}
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Change Password
                      </button>
                    </div>
                  </div>

                  <div className={`rounded-xl shadow-sm border p-6 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Two-Factor Authentication</h3>
                    <div className="space-y-4">
                      <div className={`flex items-center justify-between p-3 rounded-lg ${
                        theme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'
                      }`}>
                        <div>
                          <p className={`text-sm font-medium ${
                            theme === 'dark' ? 'text-red-200' : 'text-red-900'
                          }`}>Not Enabled</p>
                          <p className={`text-xs ${
                            theme === 'dark' ? 'text-red-300' : 'text-red-700'
                          }`}>Your account is less secure</p>
                        </div>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                      <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  <div className={`rounded-xl shadow-sm border p-6 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Login Sessions</h3>
                    <div className="space-y-3">
                      <div className={`flex items-center justify-between p-3 border rounded-lg ${
                        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <div>
                          <p className={`text-sm font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Current Session</p>
                          <p className={`text-xs ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>Chrome on Windows • New York, NY</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-green-900/30 text-green-300' 
                            : 'bg-green-100 text-green-800'
                        }`}>Active</span>
                      </div>
                    </div>
                    <button className={`w-full mt-4 border py-2 px-4 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}>
                      View All Sessions
                    </button>
                  </div>

                  <div className={`rounded-xl shadow-sm border p-6 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Account Verification</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Email Verification</span>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className={`text-xs ${
                            theme === 'dark' ? 'text-green-400' : 'text-green-600'
                          }`}>Verified</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Phone Verification</span>
                        <button className={`text-xs px-2 py-1 rounded-full transition-colors ${
                          theme === 'dark'
                            ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}>
                          Verify Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`rounded-xl shadow-sm border p-6 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Palette className="w-5 h-5 text-purple-600" />
                      Appearance
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-3 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                          {["Light", "Dark", "System"].map((themeOption) => (
                            <button
                              key={themeOption}
                              onClick={() => {
                                if (themeOption === "System") {
                                  // Reset to system preference
                                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
                                    ? 'dark' 
                                    : 'light';
                                  setTheme(systemTheme);
                                } else {
                                  setTheme(themeOption.toLowerCase());
                                }
                              }}
                              className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                                (themeOption.toLowerCase() === theme || 
                                (themeOption === "System" && theme === "system"))
                                  ? theme === 'dark'
                                    ? "border-blue-400 bg-blue-900/20 text-blue-300"
                                    : "border-blue-600 bg-blue-50 text-blue-600"
                                  : theme === 'dark'
                                    ? "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700"
                                    : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                              }`}
                            >
                              {themeOption}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-xl shadow-sm border p-6 ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'
                  }`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      <Globe className="w-5 h-5 text-green-600" />
                      Language & Region
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Language</label>
                        <select className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'border-gray-300'
                        }`}>
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>Timezone</label>
                        <select className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'border-gray-300'
                        }`}>
                          <option>Eastern Time (ET)</option>
                          <option>Pacific Time (PT)</option>
                          <option>Central Time (CT)</option>
                          <option>Mountain Time (MT)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="lg:col-span-3">
                <div className={`rounded-xl shadow-sm border p-6 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`font-semibold mb-6 flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Bell className="w-5 h-5 text-amber-600" />
                    Notification Preferences
                  </h3>
                  <div className="space-y-6">
                    {[
                      { title: "Email Notifications", desc: "Receive updates via email" },
                      { title: "Push Notifications", desc: "Browser push notifications" },
                      { title: "SMS Notifications", desc: "Text message alerts" },
                      { title: "Marketing Emails", desc: "Promotional content and updates" }
                    ].map((item, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 border rounded-lg ${
                        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <div>
                          <h4 className={`font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{item.title}</h4>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                          <div className={`w-11 h-6 rounded-full peer ${
                            theme === 'dark' 
                              ? 'bg-gray-700 peer-focus:ring-4 peer-focus:ring-blue-800' 
                              : 'bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300'
                          } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Profile;