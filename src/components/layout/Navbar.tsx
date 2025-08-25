import { Search, Bell, User, Menu, Sun, Moon, X, Settings } from "lucide-react";
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

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

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

      <header className="h-16 bg-card border-b border-border px-4 lg:px-6 flex items-center justify-between shadow-sm">
        {/* Left side - Menu button and search (desktop) */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-muted-foreground hover:text-foreground h-9 w-9">
            <Menu className="w-4 h-4" />
          </Button>
          
          {/* Desktop Search */}
          <div className="hidden lg:flex items-center relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search test cases, bugs, plans..." 
              className="pl-10 w-64 bg-background border-border h-9 text-sm" 
            />
          </div>
        </div>

        {/* Mobile Search Button */}
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="h-9 w-9">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          {/* Dark mode toggle */}
          <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="hidden sm:flex h-9 w-9">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Notifications dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Bell className="w-4 h-4" />
                </Button>
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  3
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/notifications/1")}>
                ✅ Test plan approved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/notifications/2")}>
                🐞 Bug #124 assigned
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/notifications/3")}>
                📊 New report available
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => alert("All marked as read!")}>
                Mark all as read
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/notifications")}>
                View all
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback className="text-xs">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">QA Lead</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};
