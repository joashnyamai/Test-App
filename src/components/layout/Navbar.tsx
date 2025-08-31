import { Search, Bell, User, Sun, Moon, X, Settings, LogOut, Rocket, Menu } from "lucide-react";
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
import { useUserStore } from "@/store/user-store";
import { useSettingsStore } from "@/store/settings-store";

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { settings, setSettings } = useSettingsStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const { currentUser, logout } = useUserStore();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (settings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.theme]);

  const getUserDisplayInfo = () => {
    if (currentUser) {
      const name = currentUser.firstName && currentUser.lastName
        ? `${currentUser.firstName} ${currentUser.lastName}`
        : currentUser.username || "User";
      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
      return {
        name,
        role: currentUser.role || "User",
        email: currentUser.email || "",
        avatar: currentUser.profileImage || "",
        initials,
      };
    }

    return {
      name: "Guest User",
      role: "Please sign in",
      email: "",
      avatar: "/avatars/guest.png",
      initials: "GU",
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <>
      {/* Mobile Search Overlay with enhanced design */}
      {searchOpen && (
        <div className="fixed top-0 left-0 w-full h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-50 flex items-center px-4 lg:hidden border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search test cases, bugs, plans..."
                className="pl-10 pr-12 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 h-10 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                autoFocus
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(false)}
              className="ml-3 h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <header className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 px-4 lg:px-6 flex items-center justify-between relative">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 pointer-events-none" />
        
        {/* Left side - Logo and app name */}
        <div className="flex items-center space-x-4 relative z-10">
          {/* Mobile menu button */}
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden h-9 w-9 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <Menu className="w-4 h-4" />
            </Button>
          )}
          
          {/* Enhanced Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/dashboard")}
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
              <Rocket className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-800 transition-all duration-300">
                Kiwami TestCloud
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                Quality Assurance Platform
              </div>
            </div>
          </div>
        </div>

        {/* Center - Enhanced Search bar (desktop only) */}
        <div className="flex-1 max-w-2xl mx-8 hidden lg:flex items-center relative z-10">
          <div className="relative w-full group">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
              searchFocused ? 'text-blue-500 scale-110' : 'text-gray-400'
            }`} />
            <Input
              placeholder="Search test cases, bugs, plans..."
              className="pl-12 pr-4 bg-gray-50/70 dark:bg-gray-800/50 border-gray-200/60 dark:border-gray-700/60 h-11 text-sm rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 placeholder:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/70 shadow-sm"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-opacity duration-300 pointer-events-none ${
              searchFocused ? 'opacity-100' : 'opacity-0'
            }`} />
          </div>
        </div>

        {/* Right side - Enhanced Actions */}
        <div className="flex items-center space-x-2 relative z-10">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="lg:hidden h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-200 hover:scale-105"
          >
            <Search className="w-4 h-4" />
          </Button>

          {/* Enhanced Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setSettings({ theme: settings.theme === "dark" ? "light" : "dark" })
            }
            className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-200 hover:scale-105 relative overflow-hidden group"
          >
            <div className="relative z-10">
{settings.theme === "dark" ? (
                <Sun className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-4 h-4 transform group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          {/* Enhanced Notifications dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-200 hover:scale-105 group"
                >
                  <Bell className="w-4 h-4 group-hover:animate-pulse" />
                </Button>
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
                  3
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 rounded-2xl border-gray-200/60 dark:border-gray-800/60 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl" align="end">
              <DropdownMenuLabel className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/30 rounded-t-2xl">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Notifications</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg">
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="border-gray-200/60 dark:border-gray-700/60" />
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-50/70 dark:hover:bg-gray-800/50 transition-all duration-200 rounded-none">
                  <div className="flex items-start w-full">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 p-2.5 rounded-xl mr-3 shadow-sm">
                      <span className="text-green-600 dark:text-green-400 text-sm">✅</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Test plan approved</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                        Your test plan has been approved by the team lead
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-medium">2 hours ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-50/70 dark:hover:bg-gray-800/50 transition-all duration-200 rounded-none">
                  <div className="flex items-start w-full">
                    <div className="bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/50 dark:to-rose-900/50 p-2.5 rounded-xl mr-3 shadow-sm">
                      <span className="text-red-600 dark:text-red-400 text-sm">🐞</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Bug #124 assigned</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                        A new bug has been assigned to you
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-medium">5 hours ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-50/70 dark:hover:bg-gray-800/50 transition-all duration-200 rounded-none">
                  <div className="flex items-start w-full">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 p-2.5 rounded-xl mr-3 shadow-sm">
                      <span className="text-blue-600 dark:text-blue-400 text-sm">📊</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">New report available</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                        Weekly QA report is now available for review
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-medium">1 day ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="border-gray-200/60 dark:border-gray-700/60" />
              <DropdownMenuItem 
                onClick={() => navigate("/notifications")} 
                className="justify-center cursor-pointer p-3 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-medium rounded-b-2xl transition-all duration-200"
              >
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Enhanced User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 px-3 rounded-2xl flex items-center space-x-3 border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 bg-white/70 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105 hover:shadow-lg group backdrop-blur-sm"
              >
                <Avatar className="h-7 w-7 ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-400 dark:group-hover:ring-blue-500 transition-all duration-300">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                  <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white font-bold">
                    {userInfo.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold leading-none text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                    {userInfo.name}
                  </p>
                  <p className="text-xs leading-none text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                    {userInfo.role}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 rounded-2xl border-gray-200/60 dark:border-gray-800/60 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl" align="end">
              <div className="flex items-center justify-start p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/30 rounded-t-2xl">
                <Avatar className="h-12 w-12 mr-3 ring-2 ring-gray-200 dark:ring-gray-700 shadow-lg">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                  <AvatarFallback className="text-sm bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white font-bold">
                    {userInfo.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{userInfo.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{userInfo.role}</p>
                  {currentUser && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 truncate max-w-36">{userInfo.email}</p>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator className="border-gray-200/60 dark:border-gray-700/60" />
              <div className="p-1">
                <DropdownMenuItem 
                  onClick={() => navigate("/profile")} 
                  className="cursor-pointer rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors duration-200">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium">Profile</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate("/settings")} 
                  className="cursor-pointer rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <div className="bg-gray-100 dark:bg-gray-800/50 p-2 rounded-lg mr-3 group-hover:bg-gray-200 dark:group-hover:bg-gray-700/70 transition-colors duration-200">
                      <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <span className="font-medium">Settings</span>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="border-gray-200/60 dark:border-gray-700/60" />
              <div className="p-1">
                {currentUser ? (
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="cursor-pointer text-red-600 focus:text-red-600 rounded-xl p-3 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-lg mr-3 group-hover:bg-red-200 dark:group-hover:bg-red-800/70 transition-colors duration-200">
                        <LogOut className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="font-medium">Log out</span>
                    </div>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem 
                    onClick={() => navigate("/login")} 
                    className="cursor-pointer text-blue-600 focus:text-blue-600 rounded-xl p-3 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors duration-200">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium">Sign in</span>
                    </div>
                  </DropdownMenuItem>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Subtle bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </header>
    </>
  );
};