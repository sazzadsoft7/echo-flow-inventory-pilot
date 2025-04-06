
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data - would be fetched from API in a real app
const last30DaysData = [
  { name: 'Apr 1', sales: 4000, orders: 24 },
  { name: 'Apr 3', sales: 3000, orders: 18 },
  { name: 'Apr 5', sales: 5000, orders: 30 },
  { name: 'Apr 7', sales: 2780, orders: 15 },
  { name: 'Apr 9', sales: 1890, orders: 12 },
  { name: 'Apr 11', sales: 2390, orders: 14 },
  { name: 'Apr 13', sales: 3490, orders: 21 },
  { name: 'Apr 15', sales: 2000, orders: 12 },
  { name: 'Apr 17', sales: 2780, orders: 16 },
  { name: 'Apr 19', sales: 3908, orders: 23 },
  { name: 'Apr 21', sales: 4800, orders: 28 },
  { name: 'Apr 23', sales: 3800, orders: 22 },
  { name: 'Apr 25', sales: 4300, orders: 25 },
  { name: 'Apr 27', sales: 5000, orders: 30 },
  { name: 'Apr 29', sales: 4500, orders: 27 },
];

const monthlyData = [
  { name: 'Jan', sales: 45000, orders: 270 },
  { name: 'Feb', sales: 52000, orders: 310 },
  { name: 'Mar', sales: 49000, orders: 295 },
  { name: 'Apr', sales: 63000, orders: 378 },
  { name: 'May', sales: 55000, orders: 330 },
  { name: 'Jun', sales: 71000, orders: 425 },
];

const SalesChart: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <CardDescription>Overview of your sales and orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">Last 30 Days</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last30DaysData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="sales" 
                    name="Sales ($)" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="orders" 
                    name="Orders" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="sales" 
                    name="Sales ($)" 
                    fill="hsl(var(--primary))" 
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="orders" 
                    name="Orders" 
                    fill="hsl(var(--secondary))" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
