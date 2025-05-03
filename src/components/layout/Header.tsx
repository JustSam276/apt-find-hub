
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // In a real app, this would navigate to search results
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30 w-full">
      <div className="container mx-auto py-3 px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold text-realty-primary">
            Apt-Find Hub
          </Link>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 px-4 max-w-md mx-auto md:mx-0">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search apartments..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-realty-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-realty-primary"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
        
        <nav className="flex items-center justify-end space-x-4 mt-4 md:mt-0">
          <Link to="/" className="text-realty-text-primary hover:text-realty-primary transition-colors">
            Home
          </Link>
          <Link to="/apartments" className="text-realty-text-primary hover:text-realty-primary transition-colors">
            Apartments
          </Link>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={currentUser?.avatar} />
                    <AvatarFallback className="bg-realty-primary text-white">
                      {currentUser?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {currentUser?.name}
                  <p className="text-xs text-gray-500 mt-1">{currentUser?.role}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                
                {currentUser?.role === 'realtor' && (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem asChild>
                  <Link to="/favorites">Saved Apartments</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
