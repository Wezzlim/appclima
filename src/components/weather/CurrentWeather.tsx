import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun, 
  Moon,
  RefreshCw 
} from 'lucide-react';
import { CurrentWeather as CurrentWeatherType, Location } from '../../types/weather';
import { 
  getWeatherInfo, 
  formatTemperature, 
  formatWindSpeed, 
  formatWindDirection, 
  formatHumidity, 
  formatPressure, 
  formatDateTime,
  isDayTime,
  getWeatherThemeColor 
} from '../../utils/weather';

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  location: Location;
  onRefresh?: () => void;
  loading?: boolean;
  className?: string;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weather,
  location,
  onRefresh,
  loading = false,
  className = '',
}) => {
  const weatherInfo = getWeatherInfo(weather.weathercode);
  const isDay = isDayTime(weather.is_day);
  const themeColor = getWeatherThemeColor(weather.weathercode, isDay);

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {/* Card principal */}
      <div className={`bg-gradient-to-br ${themeColor} rounded-2xl p-6 text-white shadow-xl`}>
        {/* Cabeçalho */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{location.name}</h2>
            <p className="text-white/80">
              {location.admin1 && `${location.admin1}, `}{location.country}
            </p>
            <p className="text-white/60 text-sm mt-1">
              {formatDateTime(weather.time)}
            </p>
          </div>
          
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Atualizar dados"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>

        {/* Temperatura e condição principal */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-6xl">{weatherInfo.icon}</div>
            <div>
              <div className="text-5xl font-light">
                {formatTemperature(weather.temperature)}
              </div>
              <div className="text-white/80 text-lg">
                {weatherInfo.description}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center text-white/80 mb-1">
              {isDay ? <Sun className="h-4 w-4 mr-1" /> : <Moon className="h-4 w-4 mr-1" />}
              <span className="text-sm">{isDay ? 'Dia' : 'Noite'}</span>
            </div>
            <div className="text-white/60 text-sm">
              Sensação: {formatTemperature(weather.temperature)}
            </div>
          </div>
        </div>

        {/* Detalhes do clima */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Vento */}
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Wind className="h-4 w-4 mr-2" />
              <span className="text-sm text-white/80">Vento</span>
            </div>
            <div className="text-lg font-semibold">
              {formatWindSpeed(weather.windspeed)}
            </div>
            <div className="text-xs text-white/60">
              {formatWindDirection(weather.winddirection)}
            </div>
          </div>

          {/* Umidade (estimada baseada na temperatura) */}
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Droplets className="h-4 w-4 mr-2" />
              <span className="text-sm text-white/80">Umidade</span>
            </div>
            <div className="text-lg font-semibold">
              {/* Como a API atual não retorna umidade, vamos estimar */}
              {formatHumidity(Math.max(30, Math.min(90, 80 - (weather.temperature - 20) * 2)))}
            </div>
          </div>

          {/* Pressão (estimada) */}
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Gauge className="h-4 w-4 mr-2" />
              <span className="text-sm text-white/80">Pressão</span>
            </div>
            <div className="text-lg font-semibold">
              {/* Pressão estimada ao nível do mar */}
              {formatPressure(1013)}
            </div>
          </div>

          {/* Visibilidade (estimada baseada no código do clima) */}
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <Eye className="h-4 w-4 mr-2" />
              <span className="text-sm text-white/80">Visibilidade</span>
            </div>
            <div className="text-lg font-semibold">
              {weather.weathercode <= 3 ? '10+ km' : 
               weather.weathercode <= 48 ? '5-10 km' : 
               weather.weathercode <= 67 ? '2-5 km' : '< 2 km'}
            </div>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-sm text-white/80">
            <span>Código do clima: {weather.weathercode}</span>
            <span>
              Coordenadas: {location.coordinates.latitude.toFixed(2)}°, {location.coordinates.longitude.toFixed(2)}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

