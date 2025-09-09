import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import { mockWeatherData } from '../services/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';

const WeatherDashboard = () => {
  const { isDark, toggleTheme } = useTheme();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempUnit, setTempUnit] = useState('C');
  const [lastCity, setLastCity] = useLocalStorage('lastCity', '');

  // Auto-detect location on component mount
  useEffect(() => {
    if (lastCity) {
      handleSearch(lastCity);
    } else {
      detectLocation();
    }
  }, []);

  const detectLocation = async () => {
    setLoading(true);
    try {
      // Mock geolocation for now
      setTimeout(() => {
        const mockData = mockWeatherData.getCurrentWeather('São Paulo');
        const mockForecast = mockWeatherData.getForecast('São Paulo');
        setWeatherData(mockData);
        setForecastData(mockForecast);
        setLastCity('São Paulo');
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Unable to detect location');
      setLoading(false);
    }
  };

  const handleSearch = async (city) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Mock API call for now
      setTimeout(() => {
        const mockData = mockWeatherData.getCurrentWeather(city);
        const mockForecast = mockWeatherData.getForecast(city);
        
        if (mockData) {
          setWeatherData(mockData);
          setForecastData(mockForecast);
          setLastCity(city);
        } else {
          setError('City not found');
        }
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === 'C' ? 'F' : 'C');
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Weather Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTempUnit}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-gray-700 dark:text-gray-300 font-semibold"
            >
              °{tempUnit}
            </button>
            <button
              onClick={toggleTheme}
              className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-gray-700 dark:text-gray-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Current Weather */}
        {weatherData && (
          <CurrentWeather 
            data={weatherData} 
            tempUnit={tempUnit}
            loading={loading}
          />
        )}

        {/* 5-Day Forecast */}
        {forecastData.length > 0 && (
          <Forecast 
            data={forecastData} 
            tempUnit={tempUnit}
          />
        )}

        {/* Loading State */}
        {loading && !weatherData && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;