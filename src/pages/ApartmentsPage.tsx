
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';
import ApartmentGrid from '@/components/apartments/ApartmentGrid';
import { getApartmentsWithRealtors } from '@/lib/mockData';
import { Apartment } from '@/types';

const ApartmentsPage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const fetchedApartments = getApartmentsWithRealtors();
      setApartments(fetchedApartments);
      setIsLoading(false);
    }, 500);
  }, []);
  
  const sortedApartments = [...apartments].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'bedrooms':
        return b.bedrooms - a.bedrooms;
      case 'size':
        return b.squareFeet - a.squareFeet;
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
  
  // Filter buttons component for better code organization
  const FilterButtons = () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm">All</Button>
      <Button variant="outline" size="sm">Studio</Button>
      <Button variant="outline" size="sm">1+ Bed</Button>
      <Button variant="outline" size="sm">2+ Beds</Button>
      <Button variant="outline" size="sm">3+ Beds</Button>
      <Button variant="outline" size="sm">Under $1,500</Button>
      <Button variant="outline" size="sm">$1,500 - $2,500</Button>
      <Button variant="outline" size="sm">$2,500+</Button>
    </div>
  );
  
  return (
    <MainLayout>
      <div className="container mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-realty-text-primary">
            Find Your Perfect Apartment
          </h1>
          <p className="text-realty-text-secondary">
            Browse our selection of available apartments
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="mb-4">
            <h2 className="font-medium mb-2">Quick Filters</h2>
            <FilterButtons />
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-realty-text-secondary">
              Showing <span className="font-medium">{sortedApartments.length}</span> apartments
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
                  <SelectItem value="size">Largest Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ApartmentGrid apartments={sortedApartments} />
        )}
      </div>
    </MainLayout>
  );
};

export default ApartmentsPage;
