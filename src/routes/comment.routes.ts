import { Router } from 'express';
import { auth } from '../middleware/auth';
import {
  addComment,
  getComments,
  updateComment,
  deleteComment
} from '../controllers/comment.controller';

const router = Router();

router.post('/:postId/comments', auth, addComment);
router.get('/:postId/comments', getComments);
router.patch('/:postId/comments/:commentId', auth, updateComment);
router.delete('/:postId/comments/:commentId', auth, deleteComment);

export default router;
