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
import { BugBash } from "./pages/BugBash";
import { Login } from "./pages/Login";
import Projects from "./pages/Projects"; // Import the Projects component
import QaReport from "./pages/QaReport"; // Import the QaReport component
import { TestPlans } from "./pages/TestPlans"; // Import the TestPlans component
import { TestSuites } from "./pages/TestSuites"; // Import the TestSuites component
import { Signup } from "./pages/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import RtmPage from "./pages/RtmPage";
import Reports from "./pages/Reports";
import { Notifications } from "./pages/Notifications";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

// Protect routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
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
            path="/bug-bashes"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <BugBash />
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
            path="/test-plans"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <TestPlans />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/test-suites"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <TestSuites />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile" // Add the new route for Profile
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Profile />
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
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Reports />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Notifications />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Settings />
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