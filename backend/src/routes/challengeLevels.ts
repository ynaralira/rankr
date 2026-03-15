import { Router } from 'express';
import {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  createChallengeLevel,
  getChallengeLevels,
  updateChallengeLevel,
  deleteChallengeLevel,
} from '../controllers/challengeLevelController';

const router = Router();

// Challenge
router.post('/', createChallenge);
router.get('/', getChallenges);
router.get('/:id', getChallengeById);
router.put('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);

// Challenge Levels
router.post('/level', createChallengeLevel);
router.get('/:challengeId/levels', getChallengeLevels);
router.put('/level/:id', updateChallengeLevel);
router.delete('/level/:id', deleteChallengeLevel);

export default router;
