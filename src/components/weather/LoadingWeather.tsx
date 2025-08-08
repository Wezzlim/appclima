import React from 'react';
import { Loader2, Cloud, Sun, CloudRain } from 'lucide-react';

interface LoadingWeatherProps {
  message?: string;
  className?: string;
}

export const LoadingWeather: React.FC<LoadingWeatherProps> = ({
  message = 'Carregando dados do clima...',
  className = '',
}) => {
  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Animação de ícones do clima */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Ícones animados */}
            <div className="flex space-x-2 animate-pulse">
              <Sun className="h-8 w-8 text-yellow-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <Cloud className="h-8 w-8 text-gray-400 animate-bounce" style={{ animationDelay: '200ms' }} />
              <CloudRain className="h-8 w-8 text-blue-400 animate-bounce" style={{ animationDelay: '400ms' }} />
            </div>
          </div>
        </div>

        {/* Spinner principal */}
        <div className="flex justify-center mb-4">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
        </div>

        {/* Mensagem */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-2">{message}</p>
          <p className="text-sm text-gray-500">
            Obtendo as informações mais recentes...
          </p>
        </div>

        {/* Skeleton do card de clima */}
        <div className="mt-8 space-y-4">
          {/* Skeleton do cabeçalho */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          {/* Skeleton da temperatura principal */}
          <div className="flex items-center space-x-4 py-4">
            <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-12 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton dos detalhes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-12 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-8 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de loading para a lista de previsão
export const LoadingForecast: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl p-6">
        {/* Cabeçalho */}
        <div className="flex items-center mb-6">
          <div className="h-6 w-6 bg-gray-200 rounded animate-pulse mr-3"></div>
          <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>

        {/* Lista de dias */}
        <div className="space-y-4">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                {/* Data e condição */}
                <div className="md:col-span-2 flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>

                {/* Temperaturas */}
                <div className="text-center space-y-1">
                  <div className="h-6 bg-gray-200 rounded w-12 mx-auto animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-10 mx-auto animate-pulse"></div>
                </div>

                {/* Precipitação */}
                <div className="text-center space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-12 mx-auto animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-8 mx-auto animate-pulse"></div>
                </div>

                {/* Vento */}
                <div className="text-center space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-8 mx-auto animate-pulse"></div>
                </div>

                {/* Sol e UV */}
                <div className="text-center space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-12 mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

