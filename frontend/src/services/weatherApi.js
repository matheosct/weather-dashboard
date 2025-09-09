// Weather API service - Currently using mock data
// Will be replaced with real OpenWeatherMap API integration

const API_KEY = '5748a50ba078c4680e6e3329986f8529';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = {
  // Get current weather by city name
  getCurrentWeather: async (city) => {
    try {
      // For now, this will be mock data until backend integration
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      
      return {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 10) / 10,
        visibility: Math.round(data.visibility / 1000),
        pressure: data.main.pressure,
        weather: data.weather[0].main.toLowerCase(),
        description: data.weather[0].description,
        timestamp: data.dt
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  // Get 5-day forecast by city name
  getForecast: async (city) => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      
      // Process forecast data to get daily forecasts
      const dailyForecasts = [];
      const processedDates = new Set();
      
      data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        
        if (!processedDates.has(date) && dailyForecasts.length < 5) {
          processedDates.add(date);
          
          // Find min/max temps for the day
          const dayItems = data.list.filter(listItem => {
            return new Date(listItem.dt * 1000).toDateString() === date;
          });
          
          const temps = dayItems.map(dayItem => dayItem.main.temp);
          const maxTemp = Math.round(Math.max(...temps));
          const minTemp = Math.round(Math.min(...temps));
          
          dailyForecasts.push({
            timestamp: item.dt,
            weather: item.weather[0].main.toLowerCase(),
            description: item.weather[0].description,
            maxTemp,
            minTemp,
            humidity: item.main.humidity,
            windSpeed: Math.round(item.wind.speed * 10) / 10
          });
        }
      });
      
      return dailyForecasts;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  // Get weather by coordinates (for geolocation)
  getWeatherByCoords: async (lat, lon) => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Location not found');
      }
      
      const data = await response.json();
      
      return {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 10) / 10,
        visibility: Math.round(data.visibility / 1000),
        pressure: data.main.pressure,
        weather: data.weather[0].main.toLowerCase(),
        description: data.weather[0].description,
        timestamp: data.dt
      };
    } catch (error) {
      console.error('Error fetching weather by coordinates:', error);
      throw error;
    }
  }
};