// Mock weather data for frontend development
export const mockWeatherData = {
  getCurrentWeather: (city) => {
    const cities = {
      'são paulo': {
        city: 'São Paulo',
        country: 'BR',
        temperature: 24,
        feelsLike: 26,
        humidity: 65,
        windSpeed: 3.2,
        visibility: 10,
        pressure: 1013,
        weather: 'clouds',
        description: 'partly cloudy',
        timestamp: Math.floor(Date.now() / 1000)
      },
      'rio de janeiro': {
        city: 'Rio de Janeiro',
        country: 'BR',
        temperature: 28,
        feelsLike: 31,
        humidity: 78,
        windSpeed: 2.8,
        visibility: 12,
        pressure: 1015,
        weather: 'clear',
        description: 'clear sky',
        timestamp: Math.floor(Date.now() / 1000)
      },
      'new york': {
        city: 'New York',
        country: 'US',
        temperature: 15,
        feelsLike: 13,
        humidity: 45,
        windSpeed: 4.5,
        visibility: 16,
        pressure: 1018,
        weather: 'rain',
        description: 'light rain',
        timestamp: Math.floor(Date.now() / 1000)
      },
      'london': {
        city: 'London',
        country: 'GB',
        temperature: 12,
        feelsLike: 10,
        humidity: 82,
        windSpeed: 3.8,
        visibility: 8,
        pressure: 1008,
        weather: 'clouds',
        description: 'overcast',
        timestamp: Math.floor(Date.now() / 1000)
      },
      'tokyo': {
        city: 'Tokyo',
        country: 'JP',
        temperature: 22,
        feelsLike: 24,
        humidity: 58,
        windSpeed: 2.1,
        visibility: 14,
        pressure: 1020,
        weather: 'clear',
        description: 'sunny',
        timestamp: Math.floor(Date.now() / 1000)
      }
    };

    return cities[city.toLowerCase()] || null;
  },

  getForecast: (city) => {
    const baseData = mockWeatherData.getCurrentWeather(city);
    if (!baseData) return [];

    const forecast = [];
    const today = new Date();

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Simulate some weather variation
      const tempVar = Math.random() * 10 - 5; // -5 to +5 variation
      const conditions = ['clear', 'clouds', 'rain', 'thunderstorm'];
      const randomCondition = i === 0 ? baseData.weather : conditions[Math.floor(Math.random() * conditions.length)];
      
      forecast.push({
        timestamp: Math.floor(date.getTime() / 1000),
        weather: randomCondition,
        description: getDescription(randomCondition),
        maxTemp: Math.round(baseData.temperature + tempVar + Math.random() * 5),
        minTemp: Math.round(baseData.temperature + tempVar - Math.random() * 5),
        humidity: Math.round(baseData.humidity + (Math.random() * 20 - 10)),
        windSpeed: Math.round((baseData.windSpeed + (Math.random() * 2 - 1)) * 10) / 10
      });
    }

    return forecast;
  }
};

const getDescription = (weather) => {
  const descriptions = {
    clear: 'sunny',
    clouds: 'cloudy',
    rain: 'rainy',
    thunderstorm: 'thunderstorms',
    snow: 'snowy'
  };
  return descriptions[weather] || 'partly cloudy';
};