// Weather API service
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const weatherApi = {
  // Get current weather by city name
  getCurrentWeather: async (city) => {
    try {
      const response = await fetch(`${API}/weather/current?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found');
        }
        throw new Error('Weather service unavailable');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  // Get 5-day forecast by city name
  getForecast: async (city) => {
    try {
      const response = await fetch(`${API}/weather/forecast?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found');
        }
        throw new Error('Weather service unavailable');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  // Get weather by coordinates (for geolocation)
  getWeatherByCoords: async (lat, lon) => {
    try {
      const response = await fetch(`${API}/weather/coords?lat=${lat}&lon=${lon}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Location not found');
        }
        throw new Error('Weather service unavailable');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error);
      throw error;
    }
  }
};