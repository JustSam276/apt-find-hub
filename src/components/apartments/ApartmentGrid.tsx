
import { Apartment } from '@/types';
import ApartmentCard from './ApartmentCard';

interface ApartmentGridProps {
  apartments: Apartment[];
}

const ApartmentGrid = ({ apartments }: ApartmentGridProps) => {
  if (apartments.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-realty-text-secondary">
          No apartments found
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {apartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  );
};

export default ApartmentGrid;
