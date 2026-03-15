# Proposta de funcionamento das Arenas

## Estrutura
- Cada Arena tem um tema (ex: Algoritmos, Front-end, Back-end, DevOps).
- Arenas podem ser públicas ou privadas.
- Guildas ou usuários podem se inscrever para competir.

## Fluxo de Competição
1. Inscrição: Usuários/guildas se inscrevem na Arena.
2. Fases:
   - Eliminatórias: Desafios rápidos, quem acerta mais avança.
   - Semifinal/final: Desafios mais complexos, tempo limitado.
3. Desafios:
   - Podem ser individuais ou em grupo.
   - Cada desafio tem tempo para submissão.
   - Submissões são avaliadas automaticamente ou por jurados.
4. Ranking:
   - Pontuação por vitória, tempo, qualidade da solução.
   - Ranking atualizado em tempo real.
5. Premiação:
   - XP, badges, acessórios, prêmios especiais.

## Funcionalidades
- Chat da Arena para interação.
- Visualização de soluções e resultados.
- Histórico de competições.
- Arenas tem "eventos especiais" (ex: maratona, hackathon).

## Possíveis endpoints
- GET /arenas: lista todas as arenas
- POST /arenas/:id/inscrever: inscreve usuário/guilda
- GET /arenas/:id/desafios: lista desafios ativos
- POST /arenas/:id/submeter: envia solução
- GET /arenas/:id/ranking: ranking da arena

Se quiser um fluxo específico, posso detalhar endpoints, regras e lógica!