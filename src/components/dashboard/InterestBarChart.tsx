
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InterestData {
  name: string;
  views: number;
  contacts: number;
  favorites: number;
}

interface InterestBarChartProps {
  data: InterestData[];
}

const InterestBarChart = ({ data }: InterestBarChartProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-realty-text-primary font-medium mb-4">Apartment Interest Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(value) => value.toString()} tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', borderColor: '#e0e0e0', borderRadius: '4px' }}
            />
            <Bar dataKey="views" fill="#93c5fd" name="Views" />
            <Bar dataKey="contacts" fill="#2563eb" name="Contact Requests" />
            <Bar dataKey="favorites" fill="#1e40af" name="Favorites" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InterestBarChart;
