import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Post from '../models/Post';
import { AuthRequest, IComment } from '../interfaces';
import { Types } from 'mongoose';

/**
 * Comment Controller
 * Handles blog post comments CRUD operations
 */

/**
 * Add a comment to a blog post
 * @param {AuthRequest} req - Express request object with comment data and authenticated user
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with created comment data
 * @throws {Error} When post not found
 */
export const addComment = async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = new Comment({
      content: req.body.content,
      author: req.user?._id,
      post: new Types.ObjectId(req.params.postId)
    });

    await comment.save();
    await Post.findByIdAndUpdate(post._id, {
      $push: { comments: comment._id }
    });

    await comment.populate('author', 'username');
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Could not add comment' });
  }
};

/**
 * Get all comments for a blog post
 * @param {Request} req - Express request object with post ID
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with array of comments
 */
export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ post: new Types.ObjectId(req.params.postId) })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch comments' });
  }
};

/**
 * Update a comment
 * @param {AuthRequest} req - Express request object with comment ID and update data
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with updated comment data
 * @throws {Error} When comment not found or user not authorized
 */
export const updateComment = async (req: AuthRequest, res: Response) => {
  try {
    const comment = await Comment.findOne({
      _id: new Types.ObjectId(req.params.commentId),
      author: req.user?._id
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.content = req.body.content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Could not update comment' });
  }
};

/**
 * Delete a comment
 * @param {AuthRequest} req - Express request object with comment ID
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with deletion confirmation
 * @throws {Error} When comment not found or user not authorized
 */
export const deleteComment = async (req: AuthRequest, res: Response) => {
  try {
    const comment = await Comment.findOne({
      _id: new Types.ObjectId(req.params.commentId),
      author: req.user?._id
    }).lean() as IComment | null;

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    await Comment.deleteOne({ _id: comment._id });

    // Remove comment from post's comments array
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id }
    });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete comment' });
  }
};
