
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getApartmentById } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { Apartment } from '@/types';
import MainLayout from '@/components/layout/MainLayout';
import ApartmentImageGallery from '@/components/apartments/ApartmentImageGallery';
import { useAuth } from '@/contexts/AuthContext';

const ApartmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contactMessage, setContactMessage] = useState('');
  const { isAuthenticated, currentUser } = useAuth();
  
  useEffect(() => {
    if (id) {
      // Simulate API call delay
      setTimeout(() => {
        const fetchedApartment = getApartmentById(id);
        setApartment(fetchedApartment);
        setIsLoading(false);
      }, 300);
    }
  }, [id]);
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactMessage.trim()) {
      alert(`Message sent: ${contactMessage}`);
      setContactMessage('');
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto p-4 py-8">
          <div className="animate-pulse">
            <div className="h-72 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="h-24 bg-gray-200 rounded mb-4"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!apartment) {
    return (
      <MainLayout>
        <div className="container mx-auto p-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Apartment Not Found</h1>
          <p className="mb-6">The apartment you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/apartments">Browse Other Apartments</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const { 
    title, 
    description, 
    price, 
    images, 
    address, 
    bedrooms, 
    bathrooms, 
    squareFeet, 
    features, 
    realtor 
  } = apartment;
  
  return (
    <MainLayout>
      <div className="container mx-auto p-4 py-8">
        <div className="mb-6">
          <Link 
            to="/apartments" 
            className="text-realty-primary hover:underline inline-flex items-center"
          >
            ← Back to Apartments
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Apartment Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <ApartmentImageGallery images={images} title={title} />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-realty-text-primary">{title}</h1>
              <p className="text-lg text-realty-text-secondary mt-1">
                {address.street}, {address.city}, {address.state} {address.zipCode}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Badge variant="secondary" className="px-4 py-1 text-base">
                  {bedrooms} Bed{bedrooms !== 1 ? 's' : ''}
                </Badge>
                <Badge variant="secondary" className="px-4 py-1 text-base">
                  {bathrooms} Bath{bathrooms !== 1 ? 's' : ''}
                </Badge>
                <Badge variant="secondary" className="px-4 py-1 text-base">
                  {squareFeet} sq.ft
                </Badge>
                <Badge className="bg-realty-primary text-white px-4 py-1 text-base">
                  {formatCurrency(price)}/mo
                </Badge>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-realty-text-primary">Description</h2>
              <p className="text-realty-text-secondary whitespace-pre-line">{description}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-3 text-realty-text-primary">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-realty-primary rounded-full mr-2"></span>
                    <span className="text-realty-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column: Contact Realtor */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-realty-text-primary mb-2">Contact Realtor</h2>
                {realtor ? (
                  <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20 mb-3">
                      <AvatarImage src={realtor.avatar} />
                      <AvatarFallback className="bg-realty-primary text-white text-xl">
                        {realtor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium text-lg">{realtor.name}</p>
                    {realtor.phone && (
                      <p className="text-realty-primary mt-1">{realtor.phone}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-realty-text-secondary">Realtor information not available</p>
                )}
              </div>
              
              {isAuthenticated ? (
                <form onSubmit={handleContactSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-realty-primary"
                        placeholder={`Hi${realtor ? ` ${realtor.name}` : ''}, I'm interested in this apartment...`}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full bg-realty-primary hover:bg-realty-secondary">
                      Send Message
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-md">
                  <p className="text-realty-text-secondary mb-3">
                    Please log in to contact the realtor
                  </p>
                  <Button asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ApartmentDetail;
