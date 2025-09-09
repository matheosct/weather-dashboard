import React from 'react';
import WeatherCard from './WeatherCard';

const Forecast = ({ data, tempUnit }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {data.map((day, index) => (
          <WeatherCard 
            key={index} 
            data={day} 
            tempUnit={tempUnit}
            isToday={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Forecast;