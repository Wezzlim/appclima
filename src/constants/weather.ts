import { WeatherCode } from '../types/weather';

// Códigos de clima WMO (World Meteorological Organization)
export const WEATHER_CODES: Record<number, WeatherCode> = {
  0: { code: 0, description: 'Céu limpo', icon: '☀️' },
  1: { code: 1, description: 'Principalmente limpo', icon: '🌤️' },
  2: { code: 2, description: 'Parcialmente nublado', icon: '⛅' },
  3: { code: 3, description: 'Nublado', icon: '☁️' },
  45: { code: 45, description: 'Neblina', icon: '🌫️' },
  48: { code: 48, description: 'Neblina com geada', icon: '🌫️' },
  51: { code: 51, description: 'Garoa leve', icon: '🌦️' },
  53: { code: 53, description: 'Garoa moderada', icon: '🌦️' },
  55: { code: 55, description: 'Garoa intensa', icon: '🌦️' },
  56: { code: 56, description: 'Garoa gelada leve', icon: '🌦️' },
  57: { code: 57, description: 'Garoa gelada intensa', icon: '🌦️' },
  61: { code: 61, description: 'Chuva leve', icon: '🌧️' },
  63: { code: 63, description: 'Chuva moderada', icon: '🌧️' },
  65: { code: 65, description: 'Chuva intensa', icon: '🌧️' },
  66: { code: 66, description: 'Chuva gelada leve', icon: '🌧️' },
  67: { code: 67, description: 'Chuva gelada intensa', icon: '🌧️' },
  71: { code: 71, description: 'Neve leve', icon: '🌨️' },
  73: { code: 73, description: 'Neve moderada', icon: '🌨️' },
  75: { code: 75, description: 'Neve intensa', icon: '🌨️' },
  77: { code: 77, description: 'Granizo', icon: '🌨️' },
  80: { code: 80, description: 'Pancadas de chuva leves', icon: '🌦️' },
  81: { code: 81, description: 'Pancadas de chuva moderadas', icon: '🌦️' },
  82: { code: 82, description: 'Pancadas de chuva intensas', icon: '🌦️' },
  85: { code: 85, description: 'Pancadas de neve leves', icon: '🌨️' },
  86: { code: 86, description: 'Pancadas de neve intensas', icon: '🌨️' },
  95: { code: 95, description: 'Tempestade', icon: '⛈️' },
  96: { code: 96, description: 'Tempestade com granizo leve', icon: '⛈️' },
  99: { code: 99, description: 'Tempestade com granizo intenso', icon: '⛈️' },
};

// URLs da API Open-Meteo
export const API_ENDPOINTS = {
  GEOCODING: 'https://geocoding-api.open-meteo.com/v1/search',
  WEATHER: 'https://api.open-meteo.com/v1/forecast',
} as const;

// Parâmetros padrão para a API do clima
export const DEFAULT_WEATHER_PARAMS = {
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'is_day',
    'precipitation',
    'rain',
    'showers',
    'snowfall',
    'weathercode',
    'cloudcover',
    'pressure_msl',
    'surface_pressure',
    'windspeed_10m',
    'winddirection_10m',
    'windgusts_10m',
  ],
  hourly: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'precipitation_probability',
    'precipitation',
    'rain',
    'showers',
    'snowfall',
    'weathercode',
    'pressure_msl',
    'cloudcover',
    'windspeed_10m',
    'winddirection_10m',
    'windgusts_10m',
  ],
  daily: [
    'weathercode',
    'temperature_2m_max',
    'temperature_2m_min',
    'apparent_temperature_max',
    'apparent_temperature_min',
    'sunrise',
    'sunset',
    'precipitation_sum',
    'rain_sum',
    'showers_sum',
    'snowfall_sum',
    'precipitation_hours',
    'precipitation_probability_max',
    'windspeed_10m_max',
    'windgusts_10m_max',
    'winddirection_10m_dominant',
    'shortwave_radiation_sum',
    'uv_index_max',
  ],
  timezone: 'auto',
  forecast_days: 7,
} as const;

// Configurações de timeout e retry
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 segundos
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 segundo
} as const;

