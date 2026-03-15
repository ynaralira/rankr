import express from 'express';
import {
  getInventory,
  equipAccessory,
  unequipAccessory,
  getCharacter,
  getMyCharacter,
} from '../controllers/characterController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/inventory', authenticate, getInventory);
router.post('/equip', authenticate, equipAccessory);
router.post('/unequip', authenticate, unequipAccessory);
router.get('/me', authenticate, getMyCharacter);
router.get('/:username', getCharacter);

export default router;

