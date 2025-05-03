
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-realty-text-primary">Apt-Find Hub</h3>
            <p className="text-realty-text-secondary">
              Connecting apartment seekers with their perfect home.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-realty-text-primary mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-realty-text-secondary hover:text-realty-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/apartments" className="text-realty-text-secondary hover:text-realty-primary transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-realty-text-secondary hover:text-realty-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-realty-text-primary mb-3">For Realtors</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/post-listing" className="text-realty-text-secondary hover:text-realty-primary transition-colors">
                  Post a Listing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-realty-text-secondary hover:text-realty-primary transition-colors">
                  Realtor Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-realty-text-primary mb-3">Contact</h4>
            <address className="not-italic text-realty-text-secondary">
              <p>123 Real Estate Ave.</p>
              <p>New York, NY 10001</p>
              <p className="mt-2">info@aptfindhub.com</p>
              <p>(555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-realty-text-secondary">
          <p>&copy; {new Date().getFullYear()} Apt-Find Hub. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-realty-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-realty-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
