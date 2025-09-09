import React from 'react';
import { 
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Card, CardContent } from './ui/card';

const WeatherCard = ({ data, tempUnit, isToday }) => {
  const convertTemp = (celsius) => {
    return tempUnit === 'F' ? Math.round((celsius * 9/5) + 32) : Math.round(celsius);
  };

  const getWeatherIcon = (condition) => {
    const iconProps = { size: 40, className: "mx-auto" };
    
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun {...iconProps} className="text-yellow-500 dark:text-yellow-400 mx-auto" />;
      case 'clouds':
        return <Cloud {...iconProps} className="text-gray-500 dark:text-gray-400 mx-auto" />;
      case 'rain':
        return <CloudRain {...iconProps} className="text-blue-500 dark:text-blue-400 mx-auto" />;
      case 'snow':
        return <CloudSnow {...iconProps} className="text-blue-200 dark:text-blue-300 mx-auto" />;
      case 'thunderstorm':
        return <Zap {...iconProps} className="text-purple-500 dark:text-purple-400 mx-auto" />;
      default:
        return <Sun {...iconProps} className="text-yellow-500 dark:text-yellow-400 mx-auto" />;
    }
  };

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    if (isToday) return 'Today';
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className={`text-center transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border-0 ${
      isToday 
        ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-lg' 
        : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md'
    }`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Day */}
          <div className="space-y-1">
            <h4 className={`font-bold text-lg ${
              isToday ? 'text-white' : 'text-gray-800 dark:text-white'
            }`}>
              {formatDay(data.timestamp)}
            </h4>
            <p className={`text-sm ${
              isToday ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
            }`}>
              {formatDate(data.timestamp)}
            </p>
          </div>

          {/* Weather Icon */}
          <div className="flex justify-center py-2">
            {getWeatherIcon(data.weather)}
          </div>

          {/* Weather Description */}
          <p className={`text-sm capitalize font-medium ${
            isToday ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {data.description}
          </p>

          {/* Temperature */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp size={16} className={
                isToday ? 'text-blue-200' : 'text-red-500 dark:text-red-400'
              } />
              <span className={`font-bold text-lg ${
                isToday ? 'text-white' : 'text-gray-800 dark:text-white'
              }`}>
                {convertTemp(data.maxTemp)}°
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <TrendingDown size={16} className={
                isToday ? 'text-blue-200' : 'text-blue-500 dark:text-blue-400'
              } />
              <span className={`font-medium ${
                isToday ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {convertTemp(data.minTemp)}°
              </span>
            </div>
          </div>

          {/* Additional Info */}
          <div className={`text-xs space-y-1 pt-2 border-t ${
            isToday 
              ? 'border-blue-400 text-blue-100' 
              : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-500'
          }`}>
            <div>Humidity: {data.humidity}%</div>
            <div>Wind: {data.windSpeed} m/s</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;