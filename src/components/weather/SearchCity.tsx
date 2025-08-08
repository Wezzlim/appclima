import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Location } from '../../types/weather';

interface SearchCityProps {
  onCitySelect: (city: Location) => void;
  onCurrentLocation: () => void;
  searchCities: (query: string) => Promise<Location[]>;
  loading?: boolean;
  className?: string;
}

export const SearchCity: React.FC<SearchCityProps> = ({
  onCitySelect,
  onCurrentLocation,
  searchCities,
  loading = false,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Debounce para busca
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setSearching(true);
    try {
      const results = await searchCities(searchQuery);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setSearching(false);
    }
  }, [searchCities]);

  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);
  }, [handleSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleCitySelect = (city: Location) => {
    setQuery(city.name);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onCitySelect(city);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        // Se não há sugestões, busca diretamente
        handleSearch(query);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleCitySelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleCurrentLocation = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onCurrentLocation();
  };

  // Fecha sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      {/* Campo de busca */}
      <div className="relative">
        {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {searching ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div> */}
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder="Buscar cidade..."
          disabled={loading}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   disabled:opacity-50 disabled:cursor-not-allowed
                   bg-white shadow-sm text-gray-900 placeholder-gray-500"
        />
        
        {/* Botão de localização atual */}
        <button
          onClick={handleCurrentLocation}
          disabled={loading}
          className="absolute inset-y-0 right-0 pr-3 flex items-center
                   hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                   text-gray-400 transition-colors"
          title="Usar localização atual"
        >
          <MapPin className="h-5 w-5" />
        </button>
      </div>

      {/* Lista de sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 
                   rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((city, index) => (
            <button
              key={`${city.name}-${city.coordinates.latitude}-${city.coordinates.longitude}`}
              onClick={() => handleCitySelect(city)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 
                       border-b border-gray-100 last:border-b-0
                       transition-colors ${
                         index === selectedIndex ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                       }`}
            >
              <div className="font-medium">{city.name}</div>
              <div className="text-sm text-gray-500">
                {city.admin1 && `${city.admin1}, `}{city.country}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Mensagem quando não há resultados */}
      {showSuggestions && suggestions.length === 0 && query.trim().length >= 2 && !searching && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 
                     rounded-lg shadow-lg p-4 text-center text-gray-500">
          Nenhuma cidade encontrada para "{query}"
        </div>
      )}
    </div>
  );
};

