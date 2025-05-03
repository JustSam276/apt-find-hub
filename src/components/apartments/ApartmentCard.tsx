
import { Link } from 'react-router-dom';
import { Apartment } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface ApartmentCardProps {
  apartment: Apartment;
}

const ApartmentCard = ({ apartment }: ApartmentCardProps) => {
  const { id, title, price, images, address, bedrooms, bathrooms, squareFeet } = apartment;
  
  return (
    <Link to={`/apartment/${id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={images[0]} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-0 right-0 bg-realty-accent text-white px-3 py-1 m-2 rounded-md font-medium">
            {formatCurrency(price)}/mo
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-realty-text-primary group-hover:text-realty-primary transition-colors">
            {title}
          </h3>
          <p className="text-realty-text-secondary mt-1">
            {address.city}, {address.state}
          </p>
          
          <div className="flex justify-between mt-4 text-realty-text-secondary text-sm">
            <div className="flex items-center">
              <span className="font-medium">{bedrooms}</span>
              <span className="ml-1">Bed{bedrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">{bathrooms}</span>
              <span className="ml-1">Bath{bathrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">{squareFeet}</span>
              <span className="ml-1">sq.ft</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ApartmentCard;
