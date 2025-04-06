
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Package, 
  ShoppingCart, 
  Tag, 
  FileText, 
  Settings, 
  Users, 
  LayoutDashboard 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  adminOnly?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const sidebarItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/'
    },
    {
      title: 'Products',
      icon: <Package className="h-5 w-5" />,
      href: '/products'
    },
    {
      title: 'Categories',
      icon: <Tag className="h-5 w-5" />,
      href: '/categories'
    },
    {
      title: 'Inventory',
      icon: <ShoppingCart className="h-5 w-5" />,
      href: '/inventory'
    },
    {
      title: 'Sales',
      icon: <BarChart className="h-5 w-5" />,
      href: '/sales'
    },
    {
      title: 'Reports',
      icon: <FileText className="h-5 w-5" />,
      href: '/reports'
    },
    {
      title: 'Users',
      icon: <Users className="h-5 w-5" />,
      href: '/users',
      adminOnly: true
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: '/settings'
    }
  ];

  // Filter out admin-only items if the user is not an admin
  const filteredItems = sidebarItems.filter(item => !item.adminOnly || isAdmin);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={handleCloseSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 md:relative md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <h2 className="text-xl font-bold">Sazzad</h2>
        </div>
        
        <ScrollArea className="flex-1 py-4">
          <nav className="px-2 space-y-1">
            {filteredItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <Link 
                  key={item.href} 
                  to={item.href} 
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full justify-start gap-3 font-normal",
                      isActive 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90 hover:text-sidebar-accent-foreground" 
                        : "hover:bg-sidebar-accent/10 hover:text-sidebar-foreground"
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        
        <div className="border-t border-sidebar-border p-4">
          <div className="text-xs text-sidebar-foreground/70">
            <p>Sazzad Inventory</p>
            <p>© 2025 All rights reserved</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
