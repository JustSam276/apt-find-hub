
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, icon, change }: StatsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-realty-text-secondary">{title}</h3>
          <p className="text-2xl font-semibold mt-1 text-realty-text-primary">{value}</p>
        </div>
        <div className="p-2 bg-realty-accent bg-opacity-20 rounded-full">
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm font-medium ${
              change.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change.isPositive ? '+' : '-'}{Math.abs(change.value)}%
          </span>
          <span className="ml-2 text-xs text-realty-text-secondary">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
