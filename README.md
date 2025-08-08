# App Clima 🌤️

Um aplicativo moderno de previsão do tempo desenvolvido com React, TypeScript e Tailwind CSS, integrado com a API Open-Meteo para dados meteorológicos em tempo real.

## 🚀 Características

- **Interface Moderna**: Design responsivo e intuitivo com Tailwind CSS
- **TypeScript**: Tipagem completa para maior segurança e produtividade
- **API Confiável**: Integração com Open-Meteo API para dados precisos
- **Busca Inteligente**: Busca por cidade com sugestões automáticas
- **Geolocalização**: Detecção automática da localização atual
- **Previsão Completa**: Clima atual + previsão de 7 dias
- **Tratamento de Erros**: Sistema robusto de tratamento de erros
- **Responsivo**: Funciona perfeitamente em desktop e mobile

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Vite** - Build tool moderna e rápida
- **Lucide React** - Ícones modernos
- **Open-Meteo API** - Dados meteorológicos gratuitos

## 📦 Estrutura do Projeto

```
src/
├── components/
│   └── weather/
│       ├── SearchCity.tsx      # Componente de busca
│       ├── CurrentWeather.tsx  # Clima atual
│       ├── WeeklyForecast.tsx  # Previsão semanal
│       ├── LoadingWeather.tsx  # Estados de loading
│       ├── ErrorWeather.tsx    # Tratamento de erros
│       └── index.ts           # Exportações
├── hooks/
│   └── useWeather.ts          # Hook personalizado
├── services/
│   └── weatherApi.ts          # Serviços da API
├── types/
│   └── weather.ts             # Tipos TypeScript
├── utils/
│   └── weather.ts             # Utilitários
├── constants/
│   └── weather.ts             # Constantes
├── App.tsx                    # Componente principal
└── main.tsx                   # Ponto de entrada
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado) ou npm

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd appclima
```

2. Instale as dependências:
```bash
pnpm install
# ou
npm install
```

3. Execute o projeto:
```bash
pnpm run dev
# ou
npm run dev
```

4. Abra o navegador em `http://localhost:5173`

## 🌟 Funcionalidades

### Busca por Cidade
- Digite o nome de uma cidade para buscar
- Sugestões automáticas com debounce
- Suporte a cidades internacionais

### Localização Atual
- Clique no ícone de localização para usar sua posição atual
- Requer permissão de geolocalização do navegador

### Dados do Clima
- **Clima Atual**: Temperatura, condição, vento, umidade
- **Previsão de 7 dias**: Temperaturas máx/mín, precipitação, vento
- **Detalhes**: Nascer/pôr do sol, índice UV, pressão atmosférica

### Tratamento de Erros
- Mensagens de erro específicas e úteis
- Botões de retry automático
- Sugestões de resolução de problemas

## 🎨 Design

O aplicativo utiliza um design moderno com:
- Gradientes dinâmicos baseados nas condições climáticas
- Ícones intuitivos para cada condição meteorológica
- Layout responsivo que se adapta a qualquer tela
- Animações suaves e feedback visual

## 🔧 Configuração da API

O projeto utiliza a API gratuita da Open-Meteo:
- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
- **Weather**: `https://api.open-meteo.com/v1/forecast`

Não é necessária chave de API - o serviço é completamente gratuito.

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona em:
- 📱 Smartphones (375px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1440px+)

## 🧪 Testes

Para testar o aplicativo:

1. **Busca por cidade**: Digite "São Paulo", "Rio de Janeiro", etc.
2. **Localização atual**: Clique no ícone de GPS (requer permissão)
3. **Responsividade**: Redimensione a janela do navegador
4. **Tratamento de erros**: Teste com nomes de cidades inválidos

## 🚀 Build para Produção

```bash
pnpm run build
# ou
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- [Open-Meteo](https://open-meteo.com/) - API meteorológica gratuita
- [Lucide](https://lucide.dev/) - Ícones modernos
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [React](https://react.dev/) - Biblioteca de UI

---

Desenvolvido com ❤️ usando React + TypeScript

