
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, Plus, Filter, MoreVertical, Edit, Trash, Eye, AlertTriangle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stockQty: number;
  minThreshold: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const ProductList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock products data - would be fetched from API in a real app
  const products: Product[] = [
    {
      id: '1',
      name: 'Laptop Pro X',
      category: 'Electronics',
      price: 1299.99,
      stockQty: 45,
      minThreshold: 10,
      status: 'in-stock'
    },
    {
      id: '2',
      name: 'Wireless Headphones',
      category: 'Audio',
      price: 149.99,
      stockQty: 78,
      minThreshold: 15,
      status: 'in-stock'
    },
    {
      id: '3',
      name: 'Smart Watch',
      category: 'Wearables',
      price: 249.99,
      stockQty: 8,
      minThreshold: 10,
      status: 'low-stock'
    },
    {
      id: '4',
      name: 'Desktop Monitor',
      category: 'Electronics',
      price: 349.99,
      stockQty: 0,
      minThreshold: 5,
      status: 'out-of-stock'
    },
    {
      id: '5',
      name: 'Bluetooth Speaker',
      category: 'Audio',
      price: 89.99,
      stockQty: 23,
      minThreshold: 8,
      status: 'in-stock'
    }
  ];

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'in-stock':
        return <Badge className="bg-success hover:bg-success">In Stock</Badge>;
      case 'low-stock':
        return <Badge className="bg-warning hover:bg-warning text-black">Low Stock</Badge>;
      case 'out-of-stock':
        return <Badge className="bg-destructive hover:bg-destructive">Out of Stock</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your product inventory</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="font-medium">{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      {product.stockQty}
                      {product.stockQty <= product.minThreshold && (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      )}
                    </div>
                  </td>
                  <td>{getStatusBadge(product.status)}</td>
                  <td className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                          <Edit className="h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                          <Trash className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductList;
