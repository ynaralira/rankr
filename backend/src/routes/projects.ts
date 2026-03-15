import express from 'express';
import {
  createProject,
  getProjects,
  getProject,
  deleteProject,
} from '../controllers/projectController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', authenticate, createProject);
router.delete('/:id', authenticate, deleteProject);

export default router;

