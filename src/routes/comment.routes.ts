import { Router } from 'express';
import { auth } from '../middleware/auth';
import {
  addComment,
  getComments,
  updateComment,
  deleteComment
} from '../controllers/comment.controller';

/**
 * Comment Routes
 * Base path: /posts
 * 
 * POST /:postId/comments
 * Add a new comment to a post
 * @requires Authentication
 * @param postId - ID of the post to comment on
 * @body { content: string }
 * @returns { comment: IComment }
 * @throws 404 - If post not found
 * 
 * GET /:postId/comments
 * Get all comments for a post
 * @param postId - ID of the post
 * @query { page?: number, limit?: number }
 * @returns { 
 *   comments: IComment[],
 *   totalPages: number
 * }
 * @throws 404 - If post not found
 * 
 * PATCH /:postId/comments/:commentId
 * Update a specific comment
 * @requires Authentication
 * @param postId - ID of the post
 * @param commentId - ID of the comment to update
 * @body { content: string }
 * @returns { comment: IComment }
 * @throws 404 - If post/comment not found
 * @throws 403 - If user is not the comment author
 * 
 * DELETE /:postId/comments/:commentId
 * Delete a specific comment
 * @requires Authentication
 * @param postId - ID of the post
 * @param commentId - ID of the comment to delete
 * @returns { message: string }
 * @throws 404 - If post/comment not found
 * @throws 403 - If user is not the comment author
 */

const router = Router();

router.post('/:postId/comments', auth, addComment);
router.get('/:postId/comments', getComments);
router.patch('/:postId/comments/:commentId', auth, updateComment);
router.delete('/:postId/comments/:commentId', auth, deleteComment);

export default router;
