import {
  GeocodingResponse,
  WeatherResponse,
  Location,
  ApiError,
  Coordinates
} from '../types/weather';
import { API_ENDPOINTS, DEFAULT_WEATHER_PARAMS, API_CONFIG } from '../constants/weather';
import { validateCoordinates } from '../utils/weather';

/**
 * Classe para tratamento de erros da API
 */
export class WeatherApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

/**
 * Função para fazer requisições HTTP com retry e timeout
 */
async function fetchWithRetry(
  url: string, 
  options: RequestInit = {}, 
  retries: number = API_CONFIG.MAX_RETRIES
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Tenta ler o erro da resposta, se disponível
      let errorDetails = `Erro HTTP: ${response.status} - ${response.statusText}`;
      try {
        const errorJson = await response.json();
        if (errorJson && errorJson.reason) {
          errorDetails = `Erro da API: ${errorJson.reason}`;
        } else if (errorJson) {
          errorDetails = `Erro da API: ${JSON.stringify(errorJson)}`;
        }
      } catch (e) {
        // Ignora se não conseguir parsear JSON
      }
      throw new WeatherApiError(errorDetails, response.status);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof WeatherApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new WeatherApiError('Timeout na requisição da API');
    }

    if (retries > 0) {
      console.warn(`Tentativa falhou, tentando novamente... (${retries} tentativas restantes)`);
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }

    throw new WeatherApiError(
      'Erro de rede ao conectar com a API após várias tentativas.',
      undefined,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

/**
 * Busca localizações por nome (agora usando Nominatim / OpenStreetMap)
 * Mantém o mesmo formato de retorno (Location[]) esperado pelo projeto
 */
export async function searchLocations(query: string): Promise<Location[]> {
  if (!query || query.trim().length < 2) {
    // Não lança erro, apenas retorna vazio para queries muito curtas
    return [];
  }

  // Endpoint público do Nominatim (sem chave). Importante enviar um User-Agent identificável.
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query.trim( )
  )}&format=json&limit=10&addressdetails=1&accept-language=pt-BR`;

  try {
    const response = await fetchWithRetry(url, {
      headers: {
        Accept: 'application/json',
        // Recomendação do Nominatim: informe um contato/URL do app
        'User-Agent': 'AppClima/1.0 (seu-email-ou-url-aqui)' // <-- Personalize com seu e-mail ou URL
      }
    });

    const data = await response.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item: any) => ({
      name:
        item.name ||
        (typeof item.display_name === 'string'
          ? item.display_name.split(',')[0].trim()
          : 'Local'),
      country: item.address?.country ?? '',
      admin1: item.address?.state ?? item.address?.county ?? item.address?.city ?? '',
      coordinates: {
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
      },
    })) as Location[];
  } catch (error) {
    console.error('Erro ao buscar cidades com Nominatim:', error);
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError(
      `Erro ao buscar localizações: ${error instanceof Error ? error.message : String(error)}`,
      undefined,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

/**
 * Obtém dados do clima para coordenadas específicas
 */
export async function getWeatherData(coordinates: Coordinates): Promise<WeatherResponse> {
  if (!validateCoordinates(coordinates.latitude, coordinates.longitude)) {
    throw new WeatherApiError('Coordenadas inválidas');
  }

  const url = new URL(API_ENDPOINTS.WEATHER);
  
  // Parâmetros básicos
  url.searchParams.append('latitude', coordinates.latitude.toString());
  url.searchParams.append('longitude', coordinates.longitude.toString());
  url.searchParams.append('timezone', DEFAULT_WEATHER_PARAMS.timezone);
  url.searchParams.append('forecast_days', DEFAULT_WEATHER_PARAMS.forecast_days.toString());

  // Parâmetros do clima atual
  url.searchParams.append('current', DEFAULT_WEATHER_PARAMS.current.join(','));
  
  // Parâmetros horários
  url.searchParams.append('hourly', DEFAULT_WEATHER_PARAMS.hourly.join(','));
  
  // Parâmetros diários
  url.searchParams.append('daily', DEFAULT_WEATHER_PARAMS.daily.join(','));

  try {
    const response = await fetchWithRetry(url.toString());
    const data: WeatherResponse | ApiError = await response.json();

    // Verifica se a resposta contém erro
    if ('error' in data && data.error) {
      throw new WeatherApiError(`Erro da API: ${data.reason}`);
    }

    return data as WeatherResponse;
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError(
      `Erro ao obter dados do clima: ${error instanceof Error ? error.message : String(error)}`,
      undefined,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

/**
 * Obtém dados do clima por nome da cidade
 */
export async function getWeatherByCity(cityName: string): Promise<{
  weather: WeatherResponse;
  location: Location;
}> {
  try {
    // Primeiro, busca a localização
    const locations = await searchLocations(cityName);
    
    if (locations.length === 0) {
      throw new WeatherApiError(`Cidade "${cityName}" não encontrada`);
    }

    // Usa a primeira localização encontrada
    const location = locations[0];
    
    // Obtém os dados do clima
    const weather = await getWeatherData(location.coordinates);

    return { weather, location };
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError(
      `Erro ao obter clima para "${cityName}": ${error instanceof Error ? error.message : String(error)}`,
      undefined,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

/**
 * Obtém localização atual do usuário (se permitido)
 */
export async function getCurrentLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new WeatherApiError('Geolocalização não suportada pelo navegador'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Usar Nominatim para reverter geocodificação e obter nome da cidade
          const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10&addressdetails=1&accept-language=pt-BR`;
          const response = await fetchWithRetry(reverseGeocodeUrl, {
            headers: {
              Accept: 'application/json',
              'User-Agent': 'AppClima/1.0 (coloque-seu-email-ou-url-aqui )' // <-- Personalize com seu e-mail ou URL
            }
          });
          const data = await response.json();

          if (data.error) {
            throw new WeatherApiError(data.error || "Erro ao reverter geocodificação.");
          }

          // Retorna apenas as coordenadas, como esperado pela função original do seu projeto
          resolve({
            latitude: parseFloat(data.lat),
            longitude: parseFloat(data.lon),
          });
        } catch (error) {
          console.error("Erro ao reverter geocodificação:", error);
          if (error instanceof WeatherApiError) {
            reject(error);
          } else if (error instanceof Error) {
            reject(new WeatherApiError(`Erro ao reverter geocodificação: ${error.message}`));
          } else {
            reject(new WeatherApiError("Erro desconhecido ao reverter geocodificação."));
          }
        }
      },
      (error) => {
        let message = 'Erro ao obter localização';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Permissão de localização negada';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Informações de localização indisponíveis';
            break;
          case error.TIMEOUT:
            message = 'A requisição para obter a localização excedeu o tempo limite.';
            break;
        }
        
        reject(new WeatherApiError(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0 
      }
    );
  });
}

/**
 * Obtém dados do clima para a localização atual
 */
export async function getCurrentWeather(): Promise<{
  weather: WeatherResponse;
  coordinates: Coordinates;
}> {
  try {
    const coordinates = await getCurrentLocation();
    const weather = await getWeatherData(coordinates);
    
    return { weather, coordinates };
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError(
      'Erro ao obter clima da localização atual',
      undefined,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

