
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowUpCircle, Plus } from 'lucide-react';

interface StockAlert {
  id: string;
  productName: string;
  currentStock: number;
  minThreshold: number;
  status: 'critical' | 'low' | 'reordered';
}

const StockAlerts: React.FC = () => {
  // Mock stock alerts data - would be fetched from API in a real app
  const stockAlerts: StockAlert[] = [
    {
      id: '1',
      productName: 'Widget A',
      currentStock: 3,
      minThreshold: 10,
      status: 'critical'
    },
    {
      id: '2',
      productName: 'Component B',
      currentStock: 8,
      minThreshold: 15,
      status: 'low'
    },
    {
      id: '3',
      productName: 'Product C',
      currentStock: 5,
      minThreshold: 20,
      status: 'reordered'
    },
    {
      id: '4',
      productName: 'Gadget X',
      currentStock: 2,
      minThreshold: 10,
      status: 'critical'
    }
  ];

  const getStatusBadge = (status: StockAlert['status']) => {
    switch (status) {
      case 'critical':
        return (
          <Badge variant="destructive" className="animate-pulse-alert">
            Critical
          </Badge>
        );
      case 'low':
        return <Badge variant="outline" className="border-warning text-warning">Low</Badge>;
      case 'reordered':
        return (
          <Badge variant="outline" className="border-primary text-primary">
            Reordered
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-destructive" />
            Stock Alerts
          </CardTitle>
          <CardDescription>Products that need attention</CardDescription>
        </div>
        <Button size="sm" className="h-8 gap-1">
          <Plus className="h-3.5 w-3.5" />
          Restock
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stockAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-medium">{alert.productName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">
                    Stock: {alert.currentStock} / Min: {alert.minThreshold}
                  </span>
                  {getStatusBadge(alert.status)}
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ArrowUpCircle className="h-3.5 w-3.5" />
                Reorder
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockAlerts;
