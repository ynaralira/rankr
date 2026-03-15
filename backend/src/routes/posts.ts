import express from 'express';
import {
  createPost,
  getPosts,
  likePost,
  createComment,
} from '../controllers/postController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getPosts);
router.post('/', authenticate, createPost);
router.post('/:postId/like', authenticate, likePost);
router.post('/:postId/comments', authenticate, createComment);

export default router;

