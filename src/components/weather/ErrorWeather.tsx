import React from 'react';
import { 
  AlertTriangle, 
  RefreshCw, 
  MapPin, 
  Wifi, 
  Clock,
  Search 
} from 'lucide-react';

interface ErrorWeatherProps {
  error: string;
  onRetry?: () => void;
  onSearchAgain?: () => void;
  loading?: boolean;
  className?: string;
}

export const ErrorWeather: React.FC<ErrorWeatherProps> = ({
  error,
  onRetry,
  onSearchAgain,
  loading = false,
  className = '',
}) => {
  // Determina o tipo de erro e ícone apropriado
  const getErrorInfo = (errorMessage: string) => {
    const message = errorMessage.toLowerCase();
    
    if (message.includes('não encontrada') || message.includes('not found')) {
      return {
        icon: <Search className="h-12 w-12 text-orange-500" />,
        title: 'Cidade não encontrada',
        description: 'Não conseguimos encontrar a cidade que você procura.',
        color: 'orange',
        suggestions: [
          'Verifique a ortografia do nome da cidade',
          'Tente usar o nome completo da cidade',
          'Inclua o estado ou país se necessário',
        ],
      };
    }
    
    if (message.includes('localização') || message.includes('location') || message.includes('permissão')) {
      return {
        icon: <MapPin className="h-12 w-12 text-blue-500" />,
        title: 'Problema com localização',
        description: 'Não foi possível obter sua localização atual.',
        color: 'blue',
        suggestions: [
          'Permita o acesso à localização no seu navegador',
          'Verifique se o GPS está ativado',
          'Tente buscar por uma cidade específica',
        ],
      };
    }
    
    if (message.includes('rede') || message.includes('network') || message.includes('timeout')) {
      return {
        icon: <Wifi className="h-12 w-12 text-red-500" />,
        title: 'Problema de conexão',
        description: 'Não foi possível conectar com o serviço de clima.',
        color: 'red',
        suggestions: [
          'Verifique sua conexão com a internet',
          'Tente novamente em alguns segundos',
          'Recarregue a página se o problema persistir',
        ],
      };
    }
    
    if (message.includes('timeout') || message.includes('tempo')) {
      return {
        icon: <Clock className="h-12 w-12 text-yellow-500" />,
        title: 'Tempo limite excedido',
        description: 'A requisição demorou mais que o esperado.',
        color: 'yellow',
        suggestions: [
          'Tente novamente em alguns segundos',
          'Verifique sua conexão com a internet',
          'O serviço pode estar temporariamente indisponível',
        ],
      };
    }
    
    // Erro genérico
    return {
      icon: <AlertTriangle className="h-12 w-12 text-red-500" />,
      title: 'Erro inesperado',
      description: 'Ocorreu um problema ao carregar os dados do clima.',
      color: 'red',
      suggestions: [
        'Tente novamente em alguns segundos',
        'Verifique sua conexão com a internet',
        'Recarregue a página se necessário',
      ],
    };
  };

  const errorInfo = getErrorInfo(error);

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Ícone do erro */}
        <div className="flex justify-center mb-6">
          {errorInfo.icon}
        </div>

        {/* Título e descrição */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {errorInfo.title}
        </h3>
        <p className="text-gray-600 mb-6">
          {errorInfo.description}
        </p>

        {/* Mensagem de erro detalhada */}
        <div className={`bg-${errorInfo.color}-50 border border-${errorInfo.color}-200 rounded-lg p-4 mb-6`}>
          <p className={`text-${errorInfo.color}-800 text-sm font-medium`}>
            Detalhes do erro:
          </p>
          <p className={`text-${errorInfo.color}-700 text-sm mt-1`}>
            {error}
          </p>
        </div>

        {/* Sugestões */}
        <div className="text-left mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">O que você pode tentar:</h4>
          <ul className="space-y-2">
            {errorInfo.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span className="text-gray-600 text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              disabled={loading}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 
                       text-white rounded-lg hover:bg-blue-700 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Tentando novamente...' : 'Tentar novamente'}
            </button>
          )}
          
          {onSearchAgain && (
            <button
              onClick={onSearchAgain}
              className="flex items-center justify-center px-6 py-3 bg-gray-600 
                       text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar outra cidade
            </button>
          )}
        </div>

        {/* Informação adicional */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Se o problema persistir, tente recarregar a página ou entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
};

