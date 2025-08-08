# Instruções de Uso - App Clima

## 🚀 Como Usar o Aplicativo

### 1. Iniciando o Aplicativo

Após executar `pnpm run dev`, o aplicativo estará disponível em `http://localhost:5173`.

### 2. Primeira Utilização

Ao abrir o aplicativo, você verá:
- **Tela de boas-vindas** com informações sobre os recursos
- **Campo de busca** no topo da página
- **Botão de localização** (ícone de GPS) ao lado do campo de busca

### 3. Obtendo Dados do Clima

#### Opção 1: Usar Localização Atual
1. Clique no ícone de GPS (📍) ao lado do campo de busca
2. Permita o acesso à localização quando solicitado pelo navegador
3. O aplicativo carregará automaticamente o clima da sua localização

#### Opção 2: Buscar por Cidade
1. Digite o nome de uma cidade no campo de busca
2. Aguarde as sugestões aparecerem (após 2+ caracteres)
3. Clique em uma das sugestões ou pressione Enter
4. O aplicativo carregará os dados da cidade selecionada

### 4. Navegando pelos Dados

#### Clima Atual
- **Temperatura principal** e sensação térmica
- **Condição climática** com ícone descritivo
- **Detalhes**: vento, umidade, pressão, visibilidade
- **Informações extras**: coordenadas, código do clima

#### Previsão de 7 Dias
- **Hoje**: destacado com mais detalhes
- **Próximos 6 dias**: temperaturas máx/mín, precipitação, vento
- **Detalhes extras**: nascer/pôr do sol, índice UV

### 5. Funcionalidades Especiais

#### Atualização de Dados
- Clique no ícone de atualização (🔄) no card do clima atual
- Os dados serão recarregados automaticamente

#### Tratamento de Erros
Se algo der errado, você verá:
- **Mensagem de erro específica** explicando o problema
- **Sugestões de solução** para resolver o issue
- **Botões de ação**: "Tentar novamente" ou "Buscar outra cidade"

#### Design Responsivo
- O aplicativo se adapta automaticamente ao tamanho da tela
- Funciona perfeitamente em celulares, tablets e desktops

### 6. Dicas de Uso

#### Para Melhores Resultados na Busca:
- Use nomes completos de cidades: "São Paulo" em vez de "SP"
- Inclua o estado/país se necessário: "Paris, França"
- Verifique a ortografia do nome da cidade

#### Permissões do Navegador:
- Para usar localização atual, permita o acesso quando solicitado
- Se negou a permissão, pode reativar nas configurações do navegador

#### Conectividade:
- O aplicativo requer conexão com a internet
- Em caso de problemas de rede, tente novamente após alguns segundos

### 7. Códigos de Clima

O aplicativo usa códigos WMO (World Meteorological Organization):
- **0**: Céu limpo ☀️
- **1-3**: Parcialmente nublado ⛅
- **45-48**: Neblina 🌫️
- **51-67**: Chuva 🌧️
- **71-77**: Neve 🌨️
- **80-86**: Pancadas 🌦️
- **95-99**: Tempestades ⛈️

### 8. Solução de Problemas

#### "Cidade não encontrada"
- Verifique a ortografia
- Tente o nome em português ou inglês
- Use nomes oficiais das cidades

#### "Problema com localização"
- Permita acesso à localização no navegador
- Verifique se o GPS está ativado
- Tente buscar manualmente por uma cidade

#### "Erro de conexão"
- Verifique sua conexão com a internet
- Aguarde alguns segundos e tente novamente
- Recarregue a página se necessário

### 9. Recursos Técnicos

#### Dados Fornecidos por:
- **Open-Meteo API**: Dados meteorológicos gratuitos e precisos
- **Atualização**: Dados atualizados em tempo real
- **Cobertura**: Mundial, incluindo cidades brasileiras

#### Tecnologias:
- **React + TypeScript**: Interface moderna e tipada
- **Tailwind CSS**: Design responsivo e elegante
- **Vite**: Carregamento rápido e otimizado

---

💡 **Dica**: Marque o aplicativo como favorito no seu navegador para acesso rápido à previsão do tempo!

