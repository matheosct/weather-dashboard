import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap
} from 'lucide-react';
import { Card, CardContent } from './ui/card';

const CurrentWeather = ({ data, tempUnit, loading }) => {
  if (!data) return null;

  const convertTemp = (celsius) => {
    return tempUnit === 'F' ? Math.round((celsius * 9/5) + 32) : Math.round(celsius);
  };

  const getWeatherIcon = (condition) => {
    const iconProps = { size: 80, className: "text-yellow-500 dark:text-yellow-400" };
    
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun {...iconProps} />;
      case 'clouds':
        return <Cloud {...iconProps} className="text-gray-500 dark:text-gray-400" />;
      case 'rain':
        return <CloudRain {...iconProps} className="text-blue-500 dark:text-blue-400" />;
      case 'snow':
        return <CloudSnow {...iconProps} className="text-blue-200 dark:text-blue-300" />;
      case 'thunderstorm':
        return <Zap {...iconProps} className="text-purple-500 dark:text-purple-400" />;
      default:
        return <Sun {...iconProps} />;
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Weather Info */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-6 mb-6">
              <div className="animate-pulse">
                {getWeatherIcon(data.weather)}
              </div>
              <div>
                <div className="text-6xl font-bold text-gray-800 dark:text-white mb-2">
                  {convertTemp(data.temperature)}°{tempUnit}
                </div>
                <div className="text-xl text-gray-600 dark:text-gray-300 capitalize">
                  {data.description}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {data.city}, {data.country}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {formatDate(data.timestamp)}
              </p>
              <div className="text-lg text-gray-700 dark:text-gray-300">
                Feels like {convertTemp(data.feelsLike)}°{tempUnit}
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="text-blue-500 dark:text-blue-400" size={24} />
                <span className="text-gray-600 dark:text-gray-400 font-medium">Humidity</span>
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.humidity}%
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-2">
                <Wind className="text-green-500 dark:text-green-400" size={24} />
                <span className="text-gray-600 dark:text-gray-400 font-medium">Wind Speed</span>
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.windSpeed} m/s
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="text-purple-500 dark:text-purple-400" size={24} />
                <span className="text-gray-600 dark:text-gray-400 font-medium">Visibility</span>
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.visibility} km
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-2">
                <Gauge className="text-orange-500 dark:text-orange-400" size={24} />
                <span className="text-gray-600 dark:text-gray-400 font-medium">Pressure</span>
              </div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {data.pressure} hPa
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;