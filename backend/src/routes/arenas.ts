
import { Router } from 'express';
import { enrollArena, getArenaChallenges, submitArenaChallenge, getArenaRanking, createArena } from '../controllers/arenaController';

const router = Router();

// Exemplo de endpoint para teste
router.get('/ping', (req, res) => res.json({ ok: true }));

// Criar arena
router.post('/', createArena);

// Inscrever usuário/guilda na arena
router.post('/:id/enroll', enrollArena);

// Listar desafios da arena
router.get('/:id/challenges', getArenaChallenges);

// Submeter solução para desafio da arena
router.post('/:id/challenges/:challengeId/submit', submitArenaChallenge);

// Ranking da arena
router.get('/:id/ranking', getArenaRanking);

export default router;
