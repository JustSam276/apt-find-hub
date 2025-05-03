
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import InterestBarChart from '@/components/dashboard/InterestBarChart';
import { useAuth } from '@/contexts/AuthContext';
import { mockApartments, mockApartmentInterests } from '@/lib/mockData';
import { Apartment, ApartmentInterest } from '@/types';

// Mock chart data
const interestData = [
  { name: 'Modern Downtown Loft', views: 42, contacts: 8, favorites: 15 },
  { name: 'Luxury Riverside Apt', views: 35, contacts: 12, favorites: 20 },
  { name: 'Cozy Studio', views: 28, contacts: 5, favorites: 7 },
  { name: 'Family Apartment', views: 31, contacts: 9, favorites: 11 },
  { name: 'Upscale Penthouse', views: 24, contacts: 7, favorites: 9 },
];

const Dashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [realtorApartments, setRealtorApartments] = useState<Apartment[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalFavorites, setTotalFavorites] = useState(0);

  useEffect(() => {
    if (currentUser?.id) {
      // Get apartments for this realtor
      const apartments = mockApartments.filter(apt => apt.realtorId === currentUser.id);
      setRealtorApartments(apartments);

      // Calculate stats
      const apartmentIds = apartments.map(apt => apt.id);
      const interests = mockApartmentInterests.filter(
        interest => apartmentIds.includes(interest.apartmentId)
      );

      setTotalViews(interests.filter(i => i.type === 'view').length);
      setTotalContacts(interests.filter(i => i.type === 'contact').length);
      setTotalFavorites(interests.filter(i => i.type === 'favorite').length);
    }
  }, [currentUser]);

  // Redirect if not authenticated or not a realtor
  if (!isAuthenticated || currentUser?.role !== 'realtor') {
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-realty-text-primary">Realtor Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Views"
            value={totalViews}
            icon={<span className="text-realty-primary text-xl">👁️</span>}
            change={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Contact Requests"
            value={totalContacts}
            icon={<span className="text-realty-primary text-xl">📞</span>}
            change={{ value: 8.3, isPositive: true }}
          />
          <StatsCard
            title="Saved as Favorite"
            value={totalFavorites}
            icon={<span className="text-realty-primary text-xl">❤️</span>}
            change={{ value: 5.2, isPositive: true }}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">My Properties</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interest Analytics</CardTitle>
                <CardDescription>
                  User engagement with your listed properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InterestBarChart data={interestData} />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest interactions with your listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-2">
                      <p className="font-medium">John viewed Modern Downtown Loft</p>
                      <p className="text-sm text-realty-text-secondary">2 hours ago</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="font-medium">Alex saved Luxury Riverside Apartment</p>
                      <p className="text-sm text-realty-text-secondary">Yesterday</p>
                    </div>
                    <div className="border-b pb-2">
                      <p className="font-medium">Sarah requested contact for Cozy Studio</p>
                      <p className="text-sm text-realty-text-secondary">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>
                    How your listings compare to the market
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Views per Listing</span>
                      <span className="font-medium">34 <span className="text-green-600 text-sm">▲ 8%</span></span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Time to Contact</span>
                      <span className="font-medium">2.4 days <span className="text-green-600 text-sm">▼ 12%</span></span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Engagement Rate</span>
                      <span className="font-medium">21% <span className="text-green-600 text-sm">▲ 5%</span></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle>My Listed Properties</CardTitle>
                <CardDescription>
                  Manage and track the performance of your listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {realtorApartments.length > 0 ? (
                    realtorApartments.map((apt) => (
                      <div key={apt.id} className="flex items-center border-b pb-4">
                        <div 
                          className="w-16 h-16 rounded overflow-hidden mr-4 flex-shrink-0"
                          style={{ 
                            backgroundImage: `url(${apt.images[0]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                        <div className="flex-1">
                          <h3 className="font-medium">{apt.title}</h3>
                          <p className="text-sm text-realty-text-secondary">
                            {apt.address.city}, {apt.address.state} • ${apt.price}/mo
                          </p>
                        </div>
                        <div className="text-right">
                          <p><span className="font-medium">28</span> views</p>
                          <p><span className="font-medium">6</span> leads</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-6 text-realty-text-secondary">
                      No properties found.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>
                  Potential clients who have shown interest in your properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">John Doe</h3>
                        <p className="text-sm text-realty-text-secondary">
                          Interested in: Modern Downtown Loft
                        </p>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">New Lead</span>
                    </div>
                    <p className="text-sm mb-2">
                      "Hi, I'm interested in scheduling a viewing for this apartment. Is it still available?"
                    </p>
                    <p className="text-xs text-realty-text-secondary">
                      Received: May 4, 2023 • Contact: john@example.com
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Sarah Johnson</h3>
                        <p className="text-sm text-realty-text-secondary">
                          Interested in: Cozy Studio in Historic District
                        </p>
                      </div>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">In Progress</span>
                    </div>
                    <p className="text-sm mb-2">
                      "Hello, I viewed the studio yesterday and I have a few questions about the lease terms."
                    </p>
                    <p className="text-xs text-realty-text-secondary">
                      Received: May 2, 2023 • Contact: sarah@example.com
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Alex Thompson</h3>
                        <p className="text-sm text-realty-text-secondary">
                          Interested in: Luxury Riverside Apartment
                        </p>
                      </div>
                      <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">Viewing Scheduled</span>
                    </div>
                    <p className="text-sm mb-2">
                      "I'm looking forward to our appointment on Friday at 3 PM. Thanks for accommodating my schedule."
                    </p>
                    <p className="text-xs text-realty-text-secondary">
                      Received: April 30, 2023 • Contact: alex@example.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
