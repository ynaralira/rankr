# Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/codequest?schema=public"
JWT_SECRET="seu-secret-jwt-super-seguro-aqui-mude-em-producao"
PORT=5000
NODE_ENV=development
```

## Explicação das Variáveis

- **DATABASE_URL**: URL de conexão com o banco PostgreSQL
  - Substitua `usuario`, `senha` e `codequest` pelos seus valores
  - Exemplo: `postgresql://postgres:123456@localhost:5432/codequest?schema=public`

- **JWT_SECRET**: Chave secreta para assinar tokens JWT
  - Use uma string longa e aleatória em produção
  - Exemplo: `minha-chave-super-secreta-que-nunca-deve-ser-exposta`

- **PORT**: Porta onde o servidor backend irá rodar (padrão: 5000)

- **NODE_ENV**: Ambiente de execução (`development` ou `production`)

