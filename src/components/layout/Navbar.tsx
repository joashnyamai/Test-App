import { Search, Bell, User, Menu, Sun, Moon, CheckCircle, XCircle, Users } from "lucide-react";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-muted-foreground hover:text-foreground h-9 w-9">
          <Menu className="w-4 h-4" />
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search test cases, bugs, plans..." className="pl-10 w-64 bg-background border-border h-9 text-sm" />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="h-9 w-9">
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

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
          <DropdownMenuContent className="w-80" align="end" forceMount>
            <DropdownMenuLabel className="font-normal flex items-center justify-between">
              <span className="text-sm font-medium">Notifications</span>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-muted-foreground">
                Mark all as read
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-60 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer hover:bg-muted/50">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-full">
                    <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Test Plan Completed</p>
                    <p className="text-xs text-muted-foreground">Authentication test plan has been completed successfully</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer hover:bg-muted/50">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 dark:bg-red-900/40 p-2 rounded-full">
                    <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Critical Bug Reported</p>
                    <p className="text-xs text-muted-foreground">New critical bug found in login functionality</p>
                    <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer hover:bg-muted/50">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full">
                    <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Team Update</p>
                    <p className="text-xs text-muted-foreground">New team member joined the QA team</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm text-muted-foreground cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-8 w-8">
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
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
