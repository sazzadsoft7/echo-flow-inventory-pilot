
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, DollarSign, Calendar, ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: { value: string; isPositive: boolean };
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon }) => {
  return (
    <Card className="stat-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center mt-1">
            {change.isPositive ? (
              <TrendingUp className="mr-1 h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="mr-1 h-4 w-4 text-destructive" />
            )}
            <span
              className={`text-xs ${
                change.isPositive ? 'text-success' : 'text-destructive'
              }`}
            >
              {change.value} {change.isPositive ? 'increase' : 'decrease'} from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardStats: React.FC = () => {
  // Mock stats data - would be fetched from API in a real app
  const statsData = [
    {
      title: 'Total Products',
      value: '248',
      change: { value: '12%', isPositive: true },
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: 'Monthly Sales',
      value: '$12,458',
      change: { value: '8.2%', isPositive: true },
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: 'Today\'s Orders',
      value: '23',
      change: { value: '5%', isPositive: false },
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: 'This Month',
      value: 'April 2025',
      icon: <Calendar className="h-5 w-5" />,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
