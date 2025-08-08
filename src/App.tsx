import React, { useEffect } from 'react';
import { Cloud, Github, Heart } from 'lucide-react';
import { useWeather } from './hooks/useWeather';
import { 
  SearchCity, 
  CurrentWeather, 
  WeeklyForecast, 
  LoadingWeather, 
  LoadingForecast, 
  ErrorWeather 
} from './components/weather';
import './App.css';

function App() {
  const {
    currentWeather,
    dailyForecast,
    location,
    loading,
    error,
    fetchWeatherByCity,
    fetchCurrentLocationWeather,
    searchCities,
    refreshWeather,
    clearState,
    hasData,
  } = useWeather();

  // Tenta carregar clima da localização atual ao iniciar
  useEffect(() => {
    fetchCurrentLocationWeather();
  }, [fetchCurrentLocationWeather]);

  const handleCitySelect = (selectedLocation: any) => {
    fetchWeatherByCity(selectedLocation.name);
  };

  const handleCurrentLocation = () => {
    fetchCurrentLocationWeather();
  };

  const handleRetry = () => {
    if (location) {
      refreshWeather();
    } else {
      fetchCurrentLocationWeather();
    }
  };

  const handleSearchAgain = () => {
    clearState();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cloud className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">App Clima</h1>
            </div>
            <div className="text-sm text-gray-600">
              Previsão do tempo em tempo real
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <section className="mb-8">
          <SearchCity
            onCitySelect={handleCitySelect}
            onCurrentLocation={handleCurrentLocation}
            searchCities={searchCities}
            loading={loading}
          />
        </section>

        {/* Weather Content */}
        <div className="space-y-8">
          {/* Error State */}
          {error && (
            <ErrorWeather
              error={error}
              onRetry={handleRetry}
              onSearchAgain={handleSearchAgain}
              loading={loading}
            />
          )}

          {/* Loading State */}
          {loading && !hasData && (
            <>
              <LoadingWeather />
              <LoadingForecast />
            </>
          )}

          {/* Weather Data */}
          {!error && !loading && hasData && currentWeather && location && (
            <>
              {/* Current Weather */}
              <section>
                <CurrentWeather
                  weather={currentWeather}
                  location={location}
                  onRefresh={refreshWeather}
                  loading={loading}
                />
              </section>

              {/* Weekly Forecast */}
              {dailyForecast && (
                <section>
                  <WeeklyForecast forecast={dailyForecast} />
                </section>
              )}
            </>
          )}

          {/* Welcome State */}
          {!error && !loading && !hasData && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Cloud className="h-24 w-24 text-blue-300 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Bem-vindo ao App Clima
                </h2>
                <p className="text-gray-600 mb-8">
                  Busque por uma cidade ou permita o acesso à sua localização 
                  para ver a previsão do tempo em tempo real.
                </p>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      🌟 Recursos disponíveis:
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Clima atual detalhado</li>
                      <li>• Previsão de 7 dias</li>
                      <li>• Busca por cidade</li>
                      <li>• Localização automática</li>
                      <li>• Interface responsiva</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <span>Dados fornecidos pela Open-Meteo API</span>
              <span>•</span>
              <span>Atualizado em tempo real</span>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Open-Meteo
              </a>
              <span className="text-gray-400">•</span>
              <div className="flex items-center text-gray-600">
                Feito com <Heart className="h-4 w-4 text-red-500 mx-1" /> usando React + TypeScript
              </div>
            </div>

            <div className="text-xs text-gray-500">
              © 2025 App Clima. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

