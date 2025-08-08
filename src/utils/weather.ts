import { WEATHER_CODES } from '../constants/weather';
import { WeatherCode } from '../types/weather';

/**
 * Obtém a descrição e ícone do código de clima
 */
export const getWeatherInfo = (code: number): WeatherCode => {
  return WEATHER_CODES[code] || { 
    code, 
    description: 'Condição desconhecida', 
    icon: '❓' 
  };
};

/**
 * Formata temperatura com unidade
 */
export const formatTemperature = (temp: number, unit: string = '°C'): string => {
  return `${Math.round(temp)}${unit}`;
};

/**
 * Formata velocidade do vento
 */
export const formatWindSpeed = (speed: number, unit: string = 'km/h'): string => {
  return `${Math.round(speed)} ${unit}`;
};

/**
 * Formata direção do vento
 */
export const formatWindDirection = (degrees: number): string => {
  const directions = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW'
  ];
  
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Formata precipitação
 */
export const formatPrecipitation = (amount: number, unit: string = 'mm'): string => {
  return `${amount.toFixed(1)} ${unit}`;
};

/**
 * Formata umidade
 */
export const formatHumidity = (humidity: number): string => {
  return `${Math.round(humidity)}%`;
};

/**
 * Formata pressão atmosférica
 */
export const formatPressure = (pressure: number, unit: string = 'hPa'): string => {
  return `${Math.round(pressure)} ${unit}`;
};

/**
 * Formata data e hora
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Formata apenas a data
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
};

/**
 * Formata apenas a hora
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Verifica se é dia ou noite
 */
export const isDayTime = (isDay: number): boolean => {
  return isDay === 1;
};

/**
 * Obtém a cor do tema baseada na condição climática
 */
export const getWeatherThemeColor = (weatherCode: number, isDay: boolean): string => {
  if (!isDay) {
    return 'from-slate-900 to-slate-700'; // Noite
  }

  // Dia
  if (weatherCode === 0) {
    return 'from-blue-400 to-blue-600'; // Céu limpo
  } else if (weatherCode <= 3) {
    return 'from-blue-300 to-blue-500'; // Parcialmente nublado
  } else if (weatherCode >= 61 && weatherCode <= 67) {
    return 'from-gray-400 to-gray-600'; // Chuva
  } else if (weatherCode >= 71 && weatherCode <= 77) {
    return 'from-gray-200 to-gray-400'; // Neve
  } else if (weatherCode >= 95) {
    return 'from-gray-700 to-gray-900'; // Tempestade
  }
  
  return 'from-blue-300 to-blue-500'; // Padrão
};

/**
 * Calcula a sensação térmica baseada na temperatura e vento
 */
export const calculateWindChill = (temperature: number, windSpeed: number): number => {
  if (temperature > 10 || windSpeed < 4.8) {
    return temperature;
  }
  
  return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
};

/**
 * Calcula o índice de calor baseado na temperatura e umidade
 */
export const calculateHeatIndex = (temperature: number, humidity: number): number => {
  if (temperature < 27) {
    return temperature;
  }
  
  const t = temperature;
  const h = humidity;
  
  return -8.78469475556 + 1.61139411 * t + 2.33854883889 * h - 0.14611605 * t * h 
    - 0.012308094 * t * t - 0.0164248277778 * h * h + 0.002211732 * t * t * h 
    + 0.00072546 * t * h * h - 0.000003582 * t * t * h * h;
};

/**
 * Valida coordenadas geográficas
 */
export const validateCoordinates = (lat: number, lon: number): boolean => {
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
};

/**
 * Formata coordenadas para exibição
 */
export const formatCoordinates = (lat: number, lon: number): string => {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  
  return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lon).toFixed(4)}°${lonDir}`;
};

