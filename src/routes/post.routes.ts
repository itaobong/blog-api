import { Router } from 'express';
import { auth } from '../middleware/auth';
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  searchPosts
} from '../controllers/post.controller';

const router = Router();

router.post('/', auth, createPost);
router.get('/', getPosts);
router.get('/search', searchPosts);
router.get('/:id', getPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;
