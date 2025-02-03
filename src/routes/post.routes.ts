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

/**
 * Post Routes
 * Base path: /posts
 * 
 * POST / 
 * Create a new blog post
 * @requires Authentication
 * @body { title: string, content: string }
 * @returns { post: IPost }
 * 
 * GET /
 * Retrieve all blog posts
 * @query { page?: number, limit?: number }
 * @returns { posts: IPost[], totalPages: number }
 * 
 * GET /search
 * Search posts by title and content
 * @query { q: string, page?: number, limit?: number }
 * @returns { posts: IPost[], totalPages: number }
 * 
 * GET /:id
 * Retrieve a specific post by ID
 * @param id - Post ID
 * @returns { post: IPost }
 * 
 * PATCH /:id
 * Update a specific post
 * @requires Authentication
 * @param id - Post ID
 * @body { title?: string, content?: string }
 * @returns { post: IPost }
 * @throws 403 - If user is not the post author
 * 
 * DELETE /:id
 * Delete a specific post
 * @requires Authentication
 * @param id - Post ID
 * @returns { message: string }
 * @throws 403 - If user is not the post author
 */

const router = Router();

router.post('/', auth, createPost);
router.get('/', getPosts);
router.get('/search', searchPosts);
router.get('/:id', getPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;
