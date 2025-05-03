
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    bio: currentUser?.bio || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to API
    console.log('Updated profile data:', formData);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-realty-text-primary">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback className="text-3xl bg-realty-primary text-white">
                    {currentUser?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
                  <p className="text-realty-text-secondary">
                    {currentUser?.role === 'buyer' ? 'Apartment Seeker' : 'Realtor'}
                  </p>
                  <p className="text-sm mt-1">Member since {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
                
                <Button className="w-full mb-2">Change Profile Photo</Button>
                {currentUser?.role === 'realtor' && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/dashboard">View Dashboard</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Edit Profile */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                      />
                      <p className="text-xs text-realty-text-secondary mt-1">
                        Write a short bio about yourself. This will be visible to other users.
                      </p>
                    </div>
                  </div>
                
                  <CardFooter className="px-0 pt-6">
                    <Button type="submit" className="bg-realty-primary hover:bg-realty-secondary">
                      Save Changes
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
            
            {/* Additional sections based on role */}
            {currentUser?.role === 'buyer' ? (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Set your apartment search preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Preferred Neighborhoods</Label>
                      <p className="text-sm text-realty-text-secondary mt-1">
                        Coming soon - you'll be able to save your preferred neighborhoods.
                      </p>
                    </div>
                    <div>
                      <Label>Budget Range</Label>
                      <p className="text-sm text-realty-text-secondary mt-1">
                        Coming soon - set your budget preferences for automatic matches.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                  <CardDescription>Update your professional details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Real Estate License #</Label>
                      <Input placeholder="Enter your license number" />
                    </div>
                    <div>
                      <Label>Years of Experience</Label>
                      <Input type="number" min="0" placeholder="Years of experience" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
