import axios from 'axios';

const API_KEY = 'b78ef77c909741e1b9071704251203'; // Note: In production, use environment variables
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getWeatherData =  async (location: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: location,
        days: 5,
        aqi: 'no',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const getCityAutocomplete = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch city suggestions');
  }
};