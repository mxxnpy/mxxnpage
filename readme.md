# mxxn Dashboard Frontend

Este é o frontend do mxxn Dashboard, uma aplicação Angular que exibe informações em tempo real sobre atividades e status do desenvolvedor.

## Funcionalidades

### Página Inicial
- **Relógio em tempo real**: Exibe a hora atual em São Paulo
- **Clima**: Mostra as condições climáticas atuais em São Paulo
- **Contribuições do GitHub**: Visualização das contribuições do usuário 'mxxnpy'
- **Status do Discord**: Exibe o status atual do usuário no Discord
- **Player do Spotify**: Mostra a música que está sendo reproduzida atualmente

### Página do Spotify
- **Top Artistas**: Exibe os artistas mais ouvidos
- **Top Músicas**: Mostra as músicas mais ouvidas
- **Playlists**: Lista todas as playlists do usuário
- **Player**: Controle de reprodução e visualização da música atual

### Página de Projetos
- Documentação dos projetos usando um estilo similar ao Docusaurus

## Recursos Técnicos
- **Design Responsivo**: Adaptação para diferentes tamanhos de tela
- **Tema Escuro**: Interface com tema escuro inspirado no ven.earth
- **Componentes Standalone**: Utilização da arquitetura mais recente do Angular
- **Integração com APIs**: Conexão com GitHub, Spotify, Discord e serviços de clima

## Configuração

### Pré-requisitos
- Node.js 18+
- Angular CLI 17+

### Instalação
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
```

### Configuração de Ambiente
O arquivo `src/environments/environment.ts` contém as configurações para desenvolvimento:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/backend',
  weatherApiUrl: 'http://localhost:3000/backend/weather',
  githubApiUrl: 'http://localhost:3000/backend/github',
  spotifyApiUrl: 'http://localhost:3000/backend/spotify',
  discordApiUrl: 'http://localhost:3000/backend/discord',
  baseUrl: 'http://localhost:4202'
};
```

Para produção, o arquivo `src/environments/environment.prod.ts` contém:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://mxxnpage-bff.onrender.com/backend',
  weatherApiUrl: 'https://mxxnpage-bff.onrender.com/backend/weather',
  githubApiUrl: 'https://mxxnpage-bff.onrender.com/backend/github',
  spotifyApiUrl: 'https://mxxnpage-bff.onrender.com/backend/spotify',
  discordApiUrl: 'https://mxxnpage-bff.onrender.com/backend/discord',
  baseUrl: 'https://mxxnpy.github.io'
};
```

## Construção para Produção
```bash
# Construir para produção
npm run build -- --configuration production

# Criar arquivo 404.html para SPA routing no GitHub Pages
cp dist/mxxn/index.html dist/mxxn/404.html
```

## Estrutura do Projeto

### Componentes Principais
- **Clock**: Exibe a hora atual
- **Weather**: Mostra informações do clima
- **GitHub Contributions**: Exibe as contribuições do GitHub
- **Discord Status**: Mostra o status atual do Discord
- **Spotify Player**: Exibe e controla a reprodução do Spotify
- **Spotify Top Artists/Tracks**: Exibe os artistas e músicas mais ouvidos
- **Spotify Playlists**: Lista as playlists do usuário

### Serviços
- **Weather Service**: Comunicação com a API de clima
- **GitHub Service**: Comunicação com a API do GitHub
- **Discord Service**: Comunicação com a API do Discord
- **Spotify Service**: Comunicação com a API do Spotify
- **Status Service**: Gerenciamento do status do usuário

## Guia de Uso

### Navegação
- A navegação principal está disponível no cabeçalho da aplicação
- Alterne entre as páginas Home, Spotify e Projects

### Autenticação do Spotify
1. Acesse a página do Spotify
2. Clique no botão de login
3. Autorize o acesso à sua conta do Spotify
4. Após a autenticação, você será redirecionado de volta à aplicação

### Visualização de Dados
- As informações são atualizadas automaticamente em intervalos regulares
- O status é determinado com base na hora do dia e nas atividades atuais

## Personalização
- Para alterar o usuário do GitHub, atualize a configuração no backend
- Para personalizar o esquema de cores, modifique as variáveis SCSS em `src/styles.scss`
- Para ajustar os intervalos de atualização, modifique os serviços correspondentes

## Implantação
Consulte o guia de implantação para instruções detalhadas sobre como implantar o frontend no GitHub Pages.
