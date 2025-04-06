
import React from 'react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentActivity from '@/components/dashboard/RecentActivity';
import StockAlerts from '@/components/dashboard/StockAlerts';
import SalesChart from '@/components/dashboard/SalesChart';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-3xl font-bold">
        Welcome, {user?.name || 'User'}!
      </h1>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <StockAlerts />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <RecentActivity />
        </div>
        <div>
          {/* This space is available for future dashboard components */}
          <div className="h-full border rounded-lg p-6 flex items-center justify-center bg-muted/30">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Need More Insights?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Additional analytics and reporting features coming soon.
              </p>
              <button className="text-primary text-sm hover:underline">
                Request Feature
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
