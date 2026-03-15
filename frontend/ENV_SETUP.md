# Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` na pasta `frontend/` com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Explicação das Variáveis

- **NEXT_PUBLIC_API_URL**: URL base da API backend
  - Em desenvolvimento: `http://localhost:5000/api`
  - Em produção: substitua pela URL do seu backend em produção

