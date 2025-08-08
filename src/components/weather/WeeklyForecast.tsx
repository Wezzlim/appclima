import React from 'react';
import { Calendar, Droplets, Wind, Sun, Sunrise, Sunset } from 'lucide-react';
import { DailyWeather } from '../../types/weather';
import { 
  getWeatherInfo, 
  formatTemperature, 
  formatDate, 
  formatTime, 
  formatWindSpeed, 
  formatWindDirection,
  formatPrecipitation 
} from '../../utils/weather';

interface WeeklyForecastProps {
  forecast: DailyWeather;
  className?: string;
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({
  forecast,
  className = '',
}) => {
  const days = forecast.time.map((date, index) => ({
    date,
    weatherCode: forecast.weathercode[index],
    tempMax: forecast.temperature_2m_max[index],
    tempMin: forecast.temperature_2m_min[index],
    precipitation: forecast.precipitation_sum[index],
    precipitationProb: forecast.precipitation_probability_max[index],
    windSpeed: forecast.windspeed_10m_max[index],
    windDirection: forecast.winddirection_10m_dominant[index],
    sunrise: forecast.sunrise[index],
    sunset: forecast.sunset[index],
    uvIndex: forecast.uv_index_max[index],
  }));

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl p-6">
        {/* Cabeçalho */}
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-blue-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Previsão de 7 dias</h3>
        </div>

        {/* Lista de dias */}
        <div className="space-y-4">
          {days.map((day, index) => {
            const weatherInfo = getWeatherInfo(day.weatherCode);
            const isToday = index === 0;
            
            return (
              <div
                key={day.date}
                className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                  isToday 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  {/* Data e condição */}
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{weatherInfo.icon}</div>
                      <div>
                        <div className={`font-semibold ${isToday ? 'text-blue-700' : 'text-gray-900'}`}>
                          {isToday ? 'Hoje' : formatDate(day.date)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {weatherInfo.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Temperaturas */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatTemperature(day.tempMax)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatTemperature(day.tempMin)}
                    </div>
                  </div>

                  {/* Precipitação */}
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm font-medium text-gray-700">
                        {day.precipitationProb}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatPrecipitation(day.precipitation)}
                    </div>
                  </div>

                  {/* Vento */}
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Wind className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm font-medium text-gray-700">
                        {formatWindSpeed(day.windSpeed)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatWindDirection(day.windDirection)}
                    </div>
                  </div>

                  {/* Sol e UV */}
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-1">
                      <div className="flex items-center">
                        <Sunrise className="h-3 w-3 text-orange-500 mr-1" />
                        <span className="text-xs text-gray-600">
                          {formatTime(day.sunrise)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Sunset className="h-3 w-3 text-orange-600 mr-1" />
                        <span className="text-xs text-gray-600">
                          {formatTime(day.sunset)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Sun className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-xs text-gray-600">
                        UV {day.uvIndex?.toFixed(1) || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Detalhes expandidos para hoje */}
                {isToday && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Sensação máx:</span>
                        <div className="font-medium text-blue-700">
                          {formatTemperature(day.tempMax)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Sensação mín:</span>
                        <div className="font-medium text-blue-700">
                          {formatTemperature(day.tempMin)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Horas de chuva:</span>
                        <div className="font-medium text-blue-700">
                          {forecast.precipitation_hours[index]?.toFixed(0) || 0}h
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Rajadas:</span>
                        <div className="font-medium text-blue-700">
                          {formatWindSpeed(forecast.windgusts_10m_max[index] || 0)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Rodapé com informações */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
          Dados fornecidos pela Open-Meteo API
        </div>
      </div>
    </div>
  );
};

