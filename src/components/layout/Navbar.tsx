import { Search, Bell, User, Sun, Moon, X, Settings, LogOut, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSettingsStore } from "@/store/settings-store";

interface NavbarProps {
  onMenuClick?: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  initials: string;
  isAuthenticated: boolean;
  phone?: string;
  company?: string;
  joinDate?: string;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { settings, setSettings } = useSettingsStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.theme]);

  // Check authentication status and get user data
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser({
            ...parsedUser,
            isAuthenticated: true,
            initials: parsedUser.name ? parsedUser.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'
          });
        } catch (error) {
          console.error("Error parsing user data:", error);
          // Fallback to demo user
          setUser({
            id: "default",
            name: "John Doe",
            email: "john.doe@example.com",
            role: "QA Lead",
            initials: "JD",
            isAuthenticated: true
          });
        }
      } else {
        // No user data found
        setUser(null);
      }
    };

    checkAuthStatus();

    // Listen for auth changes
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/login", { replace: true });
  };

  const getUserDisplayInfo = () => {
    if (user) {
      return {
        name: user.name,
        role: user.role,
        email: user.email,
        avatar: user.avatar,
        initials: user.initials
      };
    }
    
    // Default fallback for guest user
    return {
      name: "Guest User",
      role: "Please sign in",
      email: "",
      avatar: "/avatars/guest.png",
      initials: "GU"
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <>
      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="fixed top-0 left-0 w-full h-16 bg-card z-50 flex items-center px-4 lg:hidden">
          <div className="flex items-center w-full">
            <Search className="text-muted-foreground w-4 h-4 mr-3" />
            <Input 
              placeholder="Search..." 
              className="flex-1 bg-background border-border h-9 text-sm"
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} className="ml-2 h-9 w-9">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 lg:px-6 flex items-center justify-between shadow-sm">
        {/* Left side - Logo and app name */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate("/dashboard")}
          >
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
              </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kiwami TestCloud
            </span>
          </div>
        </div>

        {/* Center - Search bar (desktop only) */}
        <div className="flex-1 max-w-xl mx-8 hidden lg:flex items-center relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search test cases, bugs, plans..." 
            className="pl-10 bg-gray-100 dark:bg-gray-800 border-0 focus-visible:ring-2 focus-visible:ring-blue-500 h-10" 
          />
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSearchOpen(true)} 
            className="lg:hidden h-9 w-9 text-gray-600 dark:text-gray-300"
          >
            <Search className="w-4 h-4" />
          </Button>

          {/* Dark mode toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSettings({ theme: settings.theme === "dark" ? "light" : "dark" })} 
            className="h-9 w-9 text-gray-600 dark:text-gray-300"
          >
            {settings.theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Notifications dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 text-gray-600 dark:text-gray-300"
                >
                  <Bell className="w-4 h-4" />
                </Button>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel className="flex justify-between items-center">
                <span>Notifications</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-start w-full">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full mr-3">
                      <span className="text-green-600 dark:text-green-400">✅</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Test plan approved</p>
                      <p className="text-xs text-muted-foreground">Your test plan has been approved by the team lead</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-start w-full">
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full mr-3">
                      <span className="text-red-600 dark:text-red-400">🐞</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Bug #124 assigned</p>
                      <p className="text-xs text-muted-foreground">A new bug has been assigned to you</p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="flex items-start w-full">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
                      <span className="text-blue-600 dark:text-blue-400">📊</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New report available</p>
                      <p className="text-xs text-muted-foreground">Weekly QA report is now available for review</p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => navigate("/notifications")} 
                className="justify-center cursor-pointer"
              >
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-9 px-2 rounded-full flex items-center space-x-2 border border-gray-200 dark:border-gray-800"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                  <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {userInfo.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium leading-none">{userInfo.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{userInfo.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start p-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                  <AvatarFallback className="text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {userInfo.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{userInfo.name}</p>
                  <p className="text-xs text-muted-foreground">{userInfo.role}</p>
                  {user?.isAuthenticated && (
                    <p className="text-xs text-muted-foreground">{userInfo.email}</p>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => navigate("/profile")} 
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/settings")} 
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user?.isAuthenticated ? (
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem 
                  onClick={() => navigate("/login")} 
                  className="cursor-pointer text-blue-600 focus:text-blue-600"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Sign in</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};