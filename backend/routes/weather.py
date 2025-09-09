from fastapi import APIRouter, HTTPException, Query
from services.weather_service import WeatherService
from typing import Optional
import logging

logger = logging.getLogger(__name__)

weather_router = APIRouter(prefix="/weather", tags=["weather"])

def get_weather_service():
    return WeatherService()

@weather_router.get("/current")
async def get_current_weather(city: str = Query(..., description="City name")):
    """Get current weather for a city"""
    try:
        weather_service = get_weather_service()
        weather_data = await weather_service.get_current_weather(city)
        
        if not weather_data:
            raise HTTPException(status_code=404, detail="City not found")
        
        return weather_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in get_current_weather: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@weather_router.get("/forecast")
async def get_forecast(city: str = Query(..., description="City name")):
    """Get 5-day weather forecast for a city"""
    try:
        weather_service = get_weather_service()
        forecast_data = await weather_service.get_forecast(city)
        
        if not forecast_data:
            raise HTTPException(status_code=404, detail="City not found")
        
        return forecast_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in get_forecast: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@weather_router.get("/coords")
async def get_weather_by_coords(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude")
):
    """Get current weather by coordinates"""
    try:
        weather_service = get_weather_service()
        weather_data = await weather_service.get_weather_by_coords(lat, lon)
        
        if not weather_data:
            raise HTTPException(status_code=404, detail="Location not found")
        
        return weather_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in get_weather_by_coords: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))