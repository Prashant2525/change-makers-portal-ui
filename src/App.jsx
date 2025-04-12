
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

// Pages
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Tasks from "@/pages/Tasks";
import Activities from "@/pages/Activities";
import Leaderboard from "@/pages/Leaderboard";
import Events from "@/pages/Events";
import Resources from "@/pages/Resources";
import Members from "@/pages/Members";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route */}
            <Route 
              path="/login" 
              element={
                <Layout title="Login" requireAuth={false}>
                  <Login />
                </Layout>
              } 
            />

            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <Layout title="Dashboard">
                  <Dashboard />
                </Layout>
              }
            />
            <Route 
              path="/tasks" 
              element={
                <Layout title="Tasks">
                  <Tasks />
                </Layout>
              }
            />
            <Route 
              path="/activities" 
              element={
                <Layout title="Activities">
                  <Activities />
                </Layout>
              }
            />
            <Route 
              path="/leaderboard" 
              element={
                <Layout title="Leaderboard">
                  <Leaderboard />
                </Layout>
              }
            />
            <Route 
              path="/events" 
              element={
                <Layout title="Events">
                  <Events />
                </Layout>
              }
            />
            <Route 
              path="/resources" 
              element={
                <Layout title="Resources">
                  <Resources />
                </Layout>
              }
            />
            <Route 
              path="/members" 
              element={
                <Layout title="Members">
                  <Members />
                </Layout>
              }
            />

            {/* Redirect root to login or dashboard based on auth status */}
            <Route path="/" element={<Index />} />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
