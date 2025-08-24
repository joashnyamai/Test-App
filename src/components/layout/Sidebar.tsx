import { 
  LayoutDashboard, 
  FileText, 
  GitBranch, 
  Calendar, 
  Bug, 
  AlertTriangle,
  BarChart3,
  Settings,
  FolderTree,   // Test Suites
  FileSpreadsheet // QA Report Template
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Projects", path: "/projects" },
  { icon: Calendar, label: "Test Plan", path: "/test-plans" },
  { icon: GitBranch, label: "RTM (Requirements Traceability Matrix)", path: "/rtm" },
  { icon: FileText, label: "Test Cases", path: "/test-cases" },
  { icon: AlertTriangle, label: "Bug Reports", path: "/bug-reports" },
  { icon: Bug, label: "Bug Bashes", path: "/bug-bashes" },
  { icon: FolderTree, label: "Test Suites", path: "/test-suites" },
  { icon: FileSpreadsheet, label: "QA Report Template", path: "/qa-report-template" },
  { icon: BarChart3, label: "Reports & Analytics", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={`fixed left-0 top-0 h-full bg-sidebar-bg border-r border-border transition-all duration-300 z-50 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Q</span>
            </div>
            <span className="text-foreground font-medium text-sm">QA Manager</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mx-auto">
            <span className="text-white font-semibold text-sm">Q</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'nav-item-active' : ''} ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <Icon className="w-4 h-4" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
