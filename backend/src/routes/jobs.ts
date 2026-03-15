import express from 'express';
import {
  createJob,
  getJobs,
  getJob,
  applyToJob,
} from '../controllers/jobController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', authenticate, createJob);
router.post('/:id/apply', authenticate, applyToJob);

export default router;

