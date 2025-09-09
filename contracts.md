# Weather Dashboard - Integration Contracts

## Frontend-Backend Integration Plan

### API Contracts

#### 1. Current Weather API
- **Endpoint**: `GET /api/weather/current?city={city}`
- **Response Format**:
```json
{
  "city": string,
  "country": string,
  "temperature": number,
  "feelsLike": number,
  "humidity": number,
  "windSpeed": number,
  "visibility": number,
  "pressure": number,
  "weather": string,
  "description": string,
  "timestamp": number
}
```

#### 2. 5-Day Forecast API
- **Endpoint**: `GET /api/weather/forecast?city={city}`
- **Response Format**:
```json
[
  {
    "timestamp": number,
    "weather": string,
    "description": string,
    "maxTemp": number,
    "minTemp": number,
    "humidity": number,
    "windSpeed": number
  }
]
```

#### 3. Weather by Coordinates API
- **Endpoint**: `GET /api/weather/coords?lat={lat}&lon={lon}`
- **Response Format**: Same as current weather

### Mock Data Replacement

#### Current Mock Implementation:
- **File**: `/app/frontend/src/services/mockData.js`
- **Mock Cities**: São Paulo, Rio de Janeiro, New York, London, Tokyo
- **Mock Data**: Static weather data with random variations for forecast

#### Integration Changes Required:
1. Replace `mockWeatherData` calls in `WeatherDashboard.js` with actual API calls
2. Update error handling for real API responses
3. Implement proper loading states during API calls
4. Add geolocation API integration for auto-detection

### Backend Implementation Plan

#### 1. OpenWeatherMap Integration
- **API Key**: 5748a50ba078c4680e6e3329986f8529
- **Base URL**: https://api.openweathermap.org/data/2.5
- **Required Endpoints**:
  - Current weather: `/weather`
  - 5-day forecast: `/forecast`

#### 2. Backend Components to Implement:
- **Weather service**: Handle OpenWeatherMap API calls
- **Data transformation**: Convert API responses to frontend format
- **Error handling**: City not found, API failures
- **Caching**: Optional - cache weather data for performance

#### 3. Environment Variables:
- Add `OPENWEATHER_API_KEY=5748a50ba078c4680e6e3329986f8529` to backend .env

### Frontend Integration Steps:

1. **Update WeatherDashboard.js**:
   - Replace mock API calls with real backend calls
   - Update error handling for HTTP responses
   - Implement proper geolocation detection

2. **Update weatherApi.js**:
   - Enable real API calls instead of mock responses
   - Update base URL to use backend endpoints
   - Add proper error handling

3. **Remove Mock Dependencies**:
   - Remove mockData.js import from WeatherDashboard.js
   - Keep mockData.js file for future reference

### Features Currently Working (Frontend-only with Mock Data):
✅ City search with mock data  
✅ Current weather display  
✅ 5-day forecast cards  
✅ Light/Dark theme toggle  
✅ Celsius/Fahrenheit conversion  
✅ localStorage for last searched city  
✅ Responsive design  
✅ Loading states and animations  
✅ Mock location detection  

### Next Implementation Phase:
- Backend API endpoints for real weather data
- Replace frontend mock calls with real API integration
- Add proper error handling for API failures
- Implement actual geolocation functionality