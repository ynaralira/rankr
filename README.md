# CodeQuest 🗡️

**Level up your code**

Uma rede social gamificada para desenvolvedores inspirada em sistemas de progressão de jogos. Desenvolvedores ganham experiência (XP), sobem de nível, completam desafios de código, mostram projetos, conectam-se com outros desenvolvedores e descobrem oportunidades de trabalho.

## 🎮 Conceito

CodeQuest combina ideias do GitHub, LinkedIn e Stack Overflow, mas introduz **mecânicas de progressão estilo RPG e conquistas de jogos**.

## ✨ Funcionalidades

### 🔐 Autenticação
- Registro e login de usuários
- Autenticação JWT segura

### 👤 Perfil de Desenvolvedor
- Avatar, username e bio
- Stack tecnológica
- Pontos de XP e nível
- Badges conquistados
- Projetos publicados
- Barra de progresso de XP

### ⭐ Sistema de XP e Níveis
- Ganhe XP por atividades:
  - Postar projeto: +50 XP
  - Receber like: +10 XP
  - Responder pergunta: +40 XP
  - Completar desafio: +100 XP
  - Criar post: +20 XP
- Sistema de níveis:
  - Nível 1 — Beginner
  - Nível 5 — Developer
  - Nível 10 — Senior Developer
  - Nível 20 — Architect

### 📁 Showcase de Projetos
- Publique projetos com:
  - Nome e descrição
  - Stack tecnológica
  - Links GitHub e demo

### 📱 Feed Social
- Crie posts compartilhando:
  - Projetos
  - Atualizações de aprendizado
  - Perguntas de código
  - Snippets de código
- Sistema de likes e comentários

### 🔗 Conexões
- Siga outros desenvolvedores
- Recomendações baseadas em stack tecnológica compartilhada

### 🏆 Desafios de Código
- Desafios semanais
- Submissão de soluções
- Ganhe XP ao completar

### 🎖️ Sistema de Badges
- Badges como:
  - React Master
  - Backend Specialist
  - Algorithm Solver
  - Open Source Contributor
  - Full Stack Warrior

### 💼 Board de Vagas
- Empresas podem postar oportunidades
- Desenvolvedores podem se candidatar
- Filtros por stack, localização e remoto

### 📊 Dashboard
- Progresso de XP
- Atividade recente
- Desenvolvedores em destaque
- Recomendações
- Projetos trending
- Desafios atuais

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 14** (React)
- **TypeScript**
- **TailwindCSS**
- **Lucide Icons**
- **Axios**
- **React Hot Toast**

### Backend
- **Node.js**
- **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT** (jsonwebtoken)
- **bcryptjs**

## 📁 Estrutura do Projeto

```
codequest/
├── frontend/              # Aplicação Next.js
│   ├── app/              # Páginas e rotas
│   ├── components/       # Componentes reutilizáveis
│   ├── lib/              # Utilitários e API client
│   └── ...
├── backend/              # API Express
│   ├── src/
│   │   ├── controllers/  # Controllers
│   │   ├── routes/       # Rotas
│   │   ├── middleware/   # Middlewares
│   │   ├── utils/        # Utilitários
│   │   └── lib/          # Prisma client
│   ├── prisma/           # Schema Prisma
│   └── ...
└── README.md
```

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- npm ou yarn

### Passo 1: Clonar e Instalar Dependências

```bash
# Instalar dependências do projeto raiz
npm install

# Instalar dependências do frontend
cd frontend
npm install

# Instalar dependências do backend
cd ../backend
npm install
```

### Passo 2: Configurar Banco de Dados

1. Crie um banco de dados PostgreSQL:

```sql
CREATE DATABASE codequest;
```

2. Configure as variáveis de ambiente do backend:

```bash
cd backend
cp .env.example .env
```

Edite o arquivo `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/codequest?schema=public"
JWT_SECRET="seu-secret-jwt-super-seguro-aqui"
PORT=5000
NODE_ENV=development
```

3. Execute as migrações do Prisma:

```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
```

4. (Opcional) Popule o banco com dados iniciais:

```bash
npx tsx src/scripts/seed.ts
```

### Passo 3: Configurar Frontend

1. Configure as variáveis de ambiente:

```bash
cd frontend
cp .env.local.example .env.local
```

Edite o arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Passo 4: Executar o Projeto

#### Terminal 1 - Backend:

```bash
cd backend
npm run dev
```

O backend estará rodando em `http://localhost:5000`

#### Terminal 2 - Frontend:

```bash
cd frontend
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

### Acessar a Aplicação

Abra seu navegador em: **http://localhost:3000**

## 📝 Scripts Disponíveis

### Backend

```bash
npm run dev          # Inicia servidor em modo desenvolvimento
npm run build        # Compila TypeScript
npm run start        # Inicia servidor em produção
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Executa migrações
npm run prisma:studio    # Abre Prisma Studio
```

### Frontend

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linter
```

## 🎨 Paleta de Cores

- **Background Primário**: `#0B1120`
- **Background Secundário**: `#111827`
- **Bordas**: `#1F2937`
- **Texto Primário**: `#F9FAFB`
- **Texto Secundário**: `#9CA3AF`
- **Neon Cyan**: `#22D3EE`
- **Tech Purple**: `#7C3AED`
- **Deep Blue**: `#1E3A8A`
- **Stars Color**: `#A5F3FC`

## 🔑 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obter usuário atual

### Usuários
- `GET /api/users/:username` - Obter perfil
- `PUT /api/users/profile` - Atualizar perfil
- `GET /api/users/trending` - Desenvolvedores em destaque
- `GET /api/users/recommended` - Recomendações

### Projetos
- `GET /api/projects` - Listar projetos
- `GET /api/projects/:id` - Obter projeto
- `POST /api/projects` - Criar projeto
- `DELETE /api/projects/:id` - Deletar projeto

### Posts
- `GET /api/posts` - Listar posts
- `POST /api/posts` - Criar post
- `POST /api/posts/:postId/like` - Curtir post
- `POST /api/posts/:postId/comments` - Comentar

### Desafios
- `GET /api/challenges` - Listar desafios
- `GET /api/challenges/:id` - Obter desafio
- `POST /api/challenges/:id/submit` - Submeter solução

### Badges
- `GET /api/badges` - Listar badges
- `GET /api/badges/user/:userId` - Badges do usuário

### Vagas
- `GET /api/jobs` - Listar vagas
- `GET /api/jobs/:id` - Obter vaga
- `POST /api/jobs` - Criar vaga
- `POST /api/jobs/:id/apply` - Candidatar-se

### Seguir
- `POST /api/follows/:followingId` - Seguir/Deixar de seguir
- `GET /api/follows/:userId/followers` - Seguidores
- `GET /api/follows/:userId/following` - Seguindo

## 🧪 Dados de Exemplo

O script de seed cria:
- 5 badges padrão
- 3 desafios de exemplo

Você pode criar usuários, projetos e posts através da interface web.

## 📦 Próximos Passos

- [ ] Sistema de notificações em tempo real (WebSockets)
- [ ] Upload de imagens para avatares
- [ ] Sistema de busca avançada
- [ ] Filtros e ordenação em listagens
- [ ] Sistema de mensagens privadas
- [ ] Analytics de perfil
- [ ] Integração com GitHub API
- [ ] Sistema de reviews de código
- [ ] Gamificação adicional (leaderboards, rankings)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

MIT

## 👨‍💻 Desenvolvido com

- ❤️ e muito ☕

---

**CodeQuest** - Level up your code! 🗡️✨

