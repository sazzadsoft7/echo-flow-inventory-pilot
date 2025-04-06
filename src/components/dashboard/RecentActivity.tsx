
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Package, ShoppingCart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Activity {
  id: string;
  type: 'sale' | 'purchase' | 'update' | 'alert';
  title: string;
  description: string;
  time: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'sale':
      return <ShoppingCart className="h-5 w-5 text-success" />;
    case 'purchase':
      return <Package className="h-5 w-5 text-primary" />;
    case 'update':
      return <ArrowUpRight className="h-5 w-5 text-accent" />;
    case 'alert':
      return <ArrowDownRight className="h-5 w-5 text-destructive" />;
    default:
      return <Calendar className="h-5 w-5" />;
  }
};

const RecentActivity: React.FC = () => {
  // Mock activities data - would be fetched from API in a real app
  const activities: Activity[] = [
    {
      id: '1',
      type: 'sale',
      title: 'New order placed',
      description: 'Order #12345 for $1,250.00',
      time: '15 minutes ago',
      user: {
        name: 'John Doe',
        initials: 'JD'
      }
    },
    {
      id: '2',
      type: 'purchase',
      title: 'Inventory restocked',
      description: 'Added 50 units of Product XYZ',
      time: '2 hours ago',
      user: {
        name: 'Sarah Wilson',
        initials: 'SW'
      }
    },
    {
      id: '3',
      type: 'alert',
      title: 'Low stock alert',
      description: 'Widget A is below minimum threshold',
      time: '4 hours ago',
      user: {
        name: 'System',
        initials: 'SY'
      }
    },
    {
      id: '4',
      type: 'update',
      title: 'Product updated',
      description: 'Price changes applied to 15 products',
      time: '1 day ago',
      user: {
        name: 'Michael Brown',
        initials: 'MB'
      }
    },
    {
      id: '5',
      type: 'sale',
      title: 'Bulk order processed',
      description: 'Order #12346 for $4,500.00',
      time: '1 day ago',
      user: {
        name: 'Emma Johnson',
        initials: 'EJ'
      }
    }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your inventory system</CardDescription>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            Updated just now
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="mr-4 mt-0.5">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <div className="ml-auto">{getActivityIcon(activity.type)}</div>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.user.name} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
