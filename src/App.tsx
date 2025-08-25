import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import { TestCases } from "./pages/TestCases";
import { BugReports } from "./pages/BugReports";
import { Login } from "./pages/Login";
import Projects from "./pages/Projects";
import RtmPage from "./pages/RtmPage";
import QaReport from "./pages/QaReport";
import { Signup } from "./pages/Signup";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications"; // ✅ Import Notifications
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protect routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page as default */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Projects />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/test-cases"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <TestCases />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/bug-reports"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <BugReports />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/qa-report"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <QaReport />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications" // ✅ Add Notifications route
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Notifications />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/rtm"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <RtmPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
