
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import ApartmentGrid from '@/components/apartments/ApartmentGrid';
import { getApartmentsWithRealtors } from '@/lib/mockData';
import { Apartment } from '@/types';

const HomePage = () => {
  const [featuredApartments, setFeaturedApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    // Get apartments with realtor information
    const apartments = getApartmentsWithRealtors();
    
    // Only get the first 3 apartments for the featured section
    setFeaturedApartments(apartments.slice(0, 3));
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-realty-primary to-realty-secondary text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Find Your Perfect Apartment Today
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Browse thousands of apartments with detailed listings, high-quality photos, and direct contact with realtors.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-realty-primary hover:bg-gray-100">
                <Link to="/apartments">Browse Apartments</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/signup">Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Apartments Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-realty-text-primary">
                Featured Apartments
              </h2>
              <p className="text-realty-text-secondary mt-2">
                Handpicked properties that you might like
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/apartments">View All</Link>
            </Button>
          </div>

          <ApartmentGrid apartments={featuredApartments} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-realty-text-primary">
              How It Works
            </h2>
            <p className="text-realty-text-secondary mt-2 max-w-2xl mx-auto">
              Finding your next home is simple and straightforward with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-realty-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-realty-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-realty-text-primary">Search</h3>
              <p className="text-realty-text-secondary">
                Browse apartments based on your preferences for location, price, and amenities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-realty-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-realty-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-realty-text-primary">Connect</h3>
              <p className="text-realty-text-secondary">
                Contact realtors directly through our platform to schedule viewings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-realty-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-realty-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-realty-text-primary">Move In</h3>
              <p className="text-realty-text-secondary">
                Finalize your rental agreement and start enjoying your new home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-realty-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to find your dream apartment?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied renters who found their perfect home through Apt-Find Hub.
          </p>
          <Button asChild size="lg" className="bg-realty-primary text-white hover:bg-realty-secondary">
            <Link to="/signup">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
