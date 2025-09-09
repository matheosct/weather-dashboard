import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleLocationDetect = () => {
    // Mock location detection
    const cities = ['São Paulo', 'Rio de Janeiro', 'New York', 'London', 'Tokyo'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setCity(randomCity);
    onSearch(randomCity);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex gap-3 max-w-2xl mx-auto">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-12 h-12 text-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
            disabled={loading}
          />
          <Search 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
            size={20} 
          />
        </div>
        
        <Button
          type="submit"
          disabled={loading}
          className="h-12 px-8 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold transition-all duration-200 transform hover:scale-105"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          ) : (
            'Search'
          )}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={handleLocationDetect}
          disabled={loading}
          className="h-12 px-4 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200"
        >
          <MapPin size={20} />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;