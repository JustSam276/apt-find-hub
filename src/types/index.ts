
export type UserRole = 'buyer' | 'realtor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  bio?: string;
  createdAt: Date;
}

export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  features: string[];
  realtorId: string;
  realtor?: User;
  createdAt: Date;
}

export interface ApartmentInterest {
  id: string;
  apartmentId: string;
  userId: string;
  type: 'view' | 'contact' | 'favorite';
  createdAt: Date;
}
