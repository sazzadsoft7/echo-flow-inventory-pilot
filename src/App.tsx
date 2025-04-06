
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";

// Layouts
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

// Pages
import Index from "./pages/Index";
import LoginForm from "./components/auth/LoginForm";
import NotFound from "./pages/NotFound";
import ProductList from "./components/products/ProductList";
import ProductForm from "./components/products/ProductForm";
import CategoryList from "./components/categories/CategoryList";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    // Redirect to login and remember where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

// Layout wrapper for authenticated pages
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Close sidebar on route change on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="flex min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginForm />} />
              
              {/* Protected routes */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Index />
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/products" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ProductList />
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/products/new" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ProductForm />
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/products/edit/:id" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ProductForm isEditing />
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/categories" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <CategoryList />
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
