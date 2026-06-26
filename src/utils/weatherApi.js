import axios from 'axios';

// ✅ NEW WORKING API KEY!
const API_KEY = '64e3c93343fdd4e83321786a15d31078';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';


export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('City not found. Please check the spelling.');
    }
    if (error.response && error.response.status === 401) {
      throw new Error('Invalid API key.');
    }
    throw new Error('Failed to fetch weather data.');
  }
};

export const fetchForecast = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch forecast data.');
  }
};