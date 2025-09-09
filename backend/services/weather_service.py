import os
import requests
import logging
from typing import Dict, List, Optional

logger = logging.getLogger(__name__)

class WeatherService:
    def __init__(self):
        self.api_key = os.getenv('OPENWEATHER_API_KEY')
        self.base_url = 'https://api.openweathermap.org/data/2.5'
        
        if not self.api_key:
            raise ValueError("OPENWEATHER_API_KEY not found in environment variables")
    
    async def get_current_weather(self, city: str) -> Optional[Dict]:
        """Get current weather for a city"""
        try:
            url = f"{self.base_url}/weather"
            params = {
                'q': city,
                'appid': self.api_key,
                'units': 'metric'
            }
            
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code == 404:
                logger.warning(f"City not found: {city}")
                return None
            
            response.raise_for_status()
            data = response.json()
            
            return {
                'city': data['name'],
                'country': data['sys']['country'],
                'temperature': round(data['main']['temp']),
                'feelsLike': round(data['main']['feels_like']),
                'humidity': data['main']['humidity'],
                'windSpeed': round(data['wind']['speed'] * 10) / 10,
                'visibility': round(data['visibility'] / 1000),
                'pressure': data['main']['pressure'],
                'weather': data['weather'][0]['main'].lower(),
                'description': data['weather'][0]['description'],
                'timestamp': data['dt']
            }
            
        except requests.exceptions.Timeout:
            logger.error(f"Timeout while fetching weather for {city}")
            raise Exception("Weather service timeout")
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching weather for {city}: {str(e)}")
            raise Exception("Weather service unavailable")
        except Exception as e:
            logger.error(f"Unexpected error fetching weather for {city}: {str(e)}")
            raise Exception("Failed to fetch weather data")
    
    async def get_forecast(self, city: str) -> List[Dict]:
        """Get 5-day weather forecast for a city"""
        try:
            url = f"{self.base_url}/forecast"
            params = {
                'q': city,
                'appid': self.api_key,
                'units': 'metric'
            }
            
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code == 404:
                logger.warning(f"City not found for forecast: {city}")
                return []
            
            response.raise_for_status()
            data = response.json()
            
            # Process forecast data to get daily forecasts
            daily_forecasts = []
            processed_dates = set()
            
            for item in data['list']:
                date = item['dt_txt'].split(' ')[0]  # Get date part only
                
                if date not in processed_dates and len(daily_forecasts) < 5:
                    processed_dates.add(date)
                    
                    # Find min/max temps for the day
                    day_items = [
                        list_item for list_item in data['list'] 
                        if list_item['dt_txt'].startswith(date)
                    ]
                    
                    temps = [day_item['main']['temp'] for day_item in day_items]
                    max_temp = round(max(temps))
                    min_temp = round(min(temps))
                    
                    daily_forecasts.append({
                        'timestamp': item['dt'],
                        'weather': item['weather'][0]['main'].lower(),
                        'description': item['weather'][0]['description'],
                        'maxTemp': max_temp,
                        'minTemp': min_temp,
                        'humidity': item['main']['humidity'],
                        'windSpeed': round(item['wind']['speed'] * 10) / 10
                    })
            
            return daily_forecasts
            
        except requests.exceptions.Timeout:
            logger.error(f"Timeout while fetching forecast for {city}")
            raise Exception("Weather service timeout")
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching forecast for {city}: {str(e)}")
            raise Exception("Weather service unavailable")
        except Exception as e:
            logger.error(f"Unexpected error fetching forecast for {city}: {str(e)}")
            raise Exception("Failed to fetch forecast data")
    
    async def get_weather_by_coords(self, lat: float, lon: float) -> Optional[Dict]:
        """Get current weather by coordinates"""
        try:
            url = f"{self.base_url}/weather"
            params = {
                'lat': lat,
                'lon': lon,
                'appid': self.api_key,
                'units': 'metric'
            }
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            return {
                'city': data['name'],
                'country': data['sys']['country'],
                'temperature': round(data['main']['temp']),
                'feelsLike': round(data['main']['feels_like']),
                'humidity': data['main']['humidity'],
                'windSpeed': round(data['wind']['speed'] * 10) / 10,
                'visibility': round(data['visibility'] / 1000),
                'pressure': data['main']['pressure'],
                'weather': data['weather'][0]['main'].lower(),
                'description': data['weather'][0]['description'],
                'timestamp': data['dt']
            }
            
        except requests.exceptions.Timeout:
            logger.error(f"Timeout while fetching weather for coordinates {lat}, {lon}")
            raise Exception("Weather service timeout")
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching weather for coordinates {lat}, {lon}: {str(e)}")
            raise Exception("Weather service unavailable")
        except Exception as e:
            logger.error(f"Unexpected error fetching weather for coordinates {lat}, {lon}: {str(e)}")
            raise Exception("Failed to fetch weather data")