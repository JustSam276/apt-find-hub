
import { Apartment, User, ApartmentInterest } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: "buyer",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    phone: "555-123-4567",
    bio: "Looking for a nice apartment in downtown.",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "realtor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    phone: "555-987-6543",
    bio: "Real estate professional with 10+ years of experience.",
    createdAt: new Date("2022-11-20"),
  },
  {
    id: "user-3",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "buyer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    bio: "First-time home buyer looking for options.",
    createdAt: new Date("2023-03-10"),
  }
];

// Mock Apartments
export const mockApartments: Apartment[] = [
  {
    id: "apt-1",
    title: "Modern Downtown Loft",
    description: "A beautiful modern loft in the heart of downtown with floor-to-ceiling windows, hardwood floors, and an open floor plan. Includes access to a rooftop pool and fitness center. Walking distance to restaurants, shopping, and public transportation.",
    price: 2500,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
      "https://images.unsplash.com/photo-1560448204-444f743ef6e7",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d",
    ],
    address: {
      street: "123 Main Street, #501",
      city: "Metropolis",
      state: "NY",
      zipCode: "10001",
    },
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    features: ["Hardwood Floors", "Stainless Steel Appliances", "In-unit Laundry", "Central AC", "Rooftop Access"],
    realtorId: "user-2",
    createdAt: new Date("2023-04-15"),
  },
  {
    id: "apt-2",
    title: "Luxury Riverside Apartment",
    description: "Upscale apartment with stunning river views and luxury finishes. This property features a chef's kitchen, marble bathrooms, and a private balcony overlooking the water. Amenities include 24/7 doorman, valet parking, and a private gym.",
    price: 3800,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    ],
    address: {
      street: "789 River Road, #1201",
      city: "Metropolis",
      state: "NY",
      zipCode: "10002",
    },
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1800,
    features: ["River Views", "Marble Countertops", "Walk-in Closets", "Smart Home System", "Private Balcony"],
    realtorId: "user-2",
    createdAt: new Date("2023-03-22"),
  },
  {
    id: "apt-3",
    title: "Cozy Studio in Historic District",
    description: "Charming studio apartment in a historic building with original architectural details. Recently renovated with modern amenities while preserving vintage charm. Perfect for a single professional or student.",
    price: 1200,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221",
      "https://images.unsplash.com/photo-1560185009-5bf9f2849488",
    ],
    address: {
      street: "456 Elm Street, #3B",
      city: "Metropolis",
      state: "NY",
      zipCode: "10003",
    },
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 450,
    features: ["Exposed Brick", "High Ceilings", "Updated Kitchen", "Pet Friendly", "Built-in Storage"],
    realtorId: "user-2",
    createdAt: new Date("2023-05-05"),
  },
  {
    id: "apt-4",
    title: "Spacious Family Apartment with Garden",
    description: "Family-friendly 3-bedroom apartment with a private garden and plenty of natural light. Located in a quiet residential area with excellent schools nearby. The property includes a fully renovated kitchen, dedicated home office space, and ample storage.",
    price: 3200,
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0c2",
      "https://images.unsplash.com/photo-1560448075-575f4d27ecbf",
    ],
    address: {
      street: "789 Oak Avenue",
      city: "Metropolis",
      state: "NY",
      zipCode: "10004",
    },
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1600,
    features: ["Private Garden", "Renovated Kitchen", "Home Office", "Storage Room", "Family Friendly"],
    realtorId: "user-2",
    createdAt: new Date("2023-02-28"),
  },
  {
    id: "apt-5",
    title: "Upscale Penthouse with City Views",
    description: "Luxurious penthouse with panoramic city views and high-end finishes throughout. Features include a chef's kitchen with premium appliances, a master suite with a spa-like bathroom, and a large private terrace perfect for entertaining.",
    price: 5500,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
      "https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa",
    ],
    address: {
      street: "1000 Skyline Drive, PH3",
      city: "Metropolis",
      state: "NY",
      zipCode: "10005",
    },
    bedrooms: 3,
    bathrooms: 3.5,
    squareFeet: 2400,
    features: ["Panoramic Views", "Chef's Kitchen", "Private Terrace", "Premium Appliances", "Fireplace"],
    realtorId: "user-2",
    createdAt: new Date("2023-01-10"),
  },
  {
    id: "apt-6",
    title: "Budget-Friendly 1-Bedroom Near Park",
    description: "Affordable one-bedroom apartment located just steps from the city park. This bright and airy unit features updated fixtures, ample closet space, and access to a shared courtyard. Great location with easy access to public transportation.",
    price: 1500,
    images: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
    ],
    address: {
      street: "222 Park Lane, #4C",
      city: "Metropolis",
      state: "NY",
      zipCode: "10006",
    },
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 600,
    features: ["Park Access", "Updated Fixtures", "Ample Storage", "Shared Courtyard", "Pet Friendly"],
    realtorId: "user-2",
    createdAt: new Date("2023-05-20"),
  }
];

// Mock Apartment Interests
export const mockApartmentInterests: ApartmentInterest[] = [
  {
    id: "interest-1",
    apartmentId: "apt-1",
    userId: "user-1",
    type: "view",
    createdAt: new Date("2023-05-01"),
  },
  {
    id: "interest-2",
    apartmentId: "apt-1",
    userId: "user-1",
    type: "favorite",
    createdAt: new Date("2023-05-02"),
  },
  {
    id: "interest-3",
    apartmentId: "apt-2",
    userId: "user-3",
    type: "view",
    createdAt: new Date("2023-05-03"),
  },
  {
    id: "interest-4",
    apartmentId: "apt-1",
    userId: "user-3",
    type: "contact",
    createdAt: new Date("2023-05-04"),
  },
  {
    id: "interest-5",
    apartmentId: "apt-3",
    userId: "user-1",
    type: "view",
    createdAt: new Date("2023-05-05"),
  },
  {
    id: "interest-6",
    apartmentId: "apt-3",
    userId: "user-1",
    type: "favorite",
    createdAt: new Date("2023-05-06"),
  },
  {
    id: "interest-7",
    apartmentId: "apt-4",
    userId: "user-3",
    type: "view",
    createdAt: new Date("2023-05-07"),
  },
  {
    id: "interest-8",
    apartmentId: "apt-5",
    userId: "user-1",
    type: "view",
    createdAt: new Date("2023-05-08"),
  }
];

// Function to get apartments with realtor info
export const getApartmentsWithRealtors = () => {
  return mockApartments.map(apartment => {
    const realtor = mockUsers.find(user => user.id === apartment.realtorId);
    return { ...apartment, realtor };
  });
};

// Function to get apartment by id
export const getApartmentById = (id: string) => {
  const apartment = mockApartments.find(apt => apt.id === id);
  if (!apartment) return null;
  
  const realtor = mockUsers.find(user => user.id === apartment.realtorId);
  return { ...apartment, realtor };
};

// Function to get interests by apartment
export const getInterestsByApartment = (apartmentId: string) => {
  return mockApartmentInterests.filter(interest => interest.apartmentId === apartmentId);
};
