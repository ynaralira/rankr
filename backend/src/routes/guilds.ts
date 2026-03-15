import { Router } from 'express';
import {
  createGuild,
  getGuilds,
  getGuildById,
  updateGuild,
  deleteGuild,
} from '../controllers/guildController';

const router = Router();

router.post('/', createGuild);
router.get('/', getGuilds);
router.get('/:id', getGuildById);
router.put('/:id', updateGuild);
router.delete('/:id', deleteGuild);

export default router;
