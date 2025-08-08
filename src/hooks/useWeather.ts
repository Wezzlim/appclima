import { useState, useCallback } from 'react';
import { 
  WeatherState, 
  Location, 
  Coordinates,
  WeatherResponse 
} from '../types/weather';
import { 
  getWeatherByCity, 
  getWeatherData, 
  getCurrentWeather,
  searchLocations,
  WeatherApiError 
} from '../services/weatherApi';

/**
 * Hook personalizado para gerenciar o estado do clima
 */
export const useWeather = () => {
  const [state, setState] = useState<WeatherState>({
    currentWeather: null,
    dailyForecast: null,
    hourlyForecast: null,
    location: null,
    loading: false,
    error: null,
  });

  /**
   * Atualiza o estado com dados do clima
   */
  const updateWeatherData = useCallback((weather: WeatherResponse, location?: Location) => {
    setState(prev => ({
      ...prev,
      currentWeather: weather.current || null,
      dailyForecast: weather.daily || null,
      hourlyForecast: weather.hourly || null,
      location: location || prev.location,
      loading: false,
      error: null,
    }));
  }, []);

  /**
   * Define estado de loading
   */
  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  /**
   * Define erro
   */
  const setError = useCallback((error: string | null) => {
    setState(prev => ({ 
      ...prev, 
      error, 
      loading: false 
    }));
  }, []);

  /**
   * Limpa o estado
   */
  const clearState = useCallback(() => {
    setState({
      currentWeather: null,
      dailyForecast: null,
      hourlyForecast: null,
      location: null,
      loading: false,
      error: null,
    });
  }, []);

  /**
   * Busca clima por nome da cidade
   */
  const fetchWeatherByCity = useCallback(async (cityName: string) => {
    if (!cityName.trim()) {
      setError('Nome da cidade é obrigatório');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { weather, location } = await getWeatherByCity(cityName);
      updateWeatherData(weather, location);
    } catch (error) {
      const errorMessage = error instanceof WeatherApiError 
        ? error.message 
        : 'Erro inesperado ao buscar dados do clima';
      setError(errorMessage);
      console.error('Erro ao buscar clima por cidade:', error);
    }
  }, [setLoading, setError, updateWeatherData]);

  /**
   * Busca clima por coordenadas
   */
  const fetchWeatherByCoordinates = useCallback(async (coordinates: Coordinates) => {
    setLoading(true);
    setError(null);

    try {
      const weather = await getWeatherData(coordinates);
      updateWeatherData(weather);
    } catch (error) {
      const errorMessage = error instanceof WeatherApiError 
        ? error.message 
        : 'Erro inesperado ao buscar dados do clima';
      setError(errorMessage);
      console.error('Erro ao buscar clima por coordenadas:', error);
    }
  }, [setLoading, setError, updateWeatherData]);

  /**
   * Busca clima da localização atual
   */
  const fetchCurrentLocationWeather = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { weather, coordinates } = await getCurrentWeather();
      updateWeatherData(weather);
      
      // Atualiza o estado com as coordenadas obtidas
      setState(prev => ({
        ...prev,
        location: prev.location || {
          name: 'Localização Atual',
          country: '',
          coordinates,
        },
      }));
    } catch (error) {
      const errorMessage = error instanceof WeatherApiError 
        ? error.message 
        : 'Erro inesperado ao buscar localização atual';
      setError(errorMessage);
      console.error('Erro ao buscar clima da localização atual:', error);
    }
  }, [setLoading, setError, updateWeatherData]);

  /**
   * Busca localizações por nome
   */
  const searchCities = useCallback(async (query: string): Promise<Location[]> => {
    if (!query.trim()) {
      return [];
    }

    try {
      return await searchLocations(query);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      return [];
    }
  }, []);

  /**
   * Recarrega os dados do clima atual
   */
  const refreshWeather = useCallback(async () => {
    if (!state.location?.coordinates) {
      setError('Nenhuma localização selecionada para recarregar');
      return;
    }

    await fetchWeatherByCoordinates(state.location.coordinates);
  }, [state.location?.coordinates, fetchWeatherByCoordinates, setError]);

  return {
    // Estado
    ...state,
    
    // Ações
    fetchWeatherByCity,
    fetchWeatherByCoordinates,
    fetchCurrentLocationWeather,
    searchCities,
    refreshWeather,
    clearState,
    setError,
    
    // Utilitários
    hasData: !!(state.currentWeather || state.dailyForecast),
    isLocationSet: !!state.location,
  };
};

