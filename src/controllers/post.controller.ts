import { Request, Response } from 'express';
import Post from '../models/Post';
import { AuthRequest } from '../interfaces';

/**
 * Post Controller
 * Handles blog post CRUD operations and search functionality
 */

/**
 * Create a new blog post
 * @param {AuthRequest} req - Express request object with post data and authenticated user
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with created post data
 */
export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const post = new Post({
      ...req.body,
      author: req.user?._id
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Could not create post' });
  }
};

/**
 * Get all blog posts with optional pagination
 * @param {AuthRequest} req - Express request object with optional query parameters
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with array of posts and pagination data
 */
export const getPosts = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch posts' });
  }
};

/**
 * Get a single blog post by ID
 * @param {AuthRequest} req - Express request object with post ID parameter
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with post data or not found error
 */
export const getPost = async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }
      });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch post' });
  }
};

/**
 * Update a blog post
 * @param {AuthRequest} req - Express request object with post ID and update data
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with updated post data
 * @throws {Error} When post not found or user not authorized
 */
export const updatePost = async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      author: req.user?._id
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Could not update post' });
  }
};

/**
 * Delete a blog post
 * @param {AuthRequest} req - Express request object with post ID
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with deletion confirmation
 * @throws {Error} When post not found or user not authorized
 */
export const deletePost = async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user?._id
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete post' });
  }
};

/**
 * Search posts by title or content
 * @param {AuthRequest} req - Express request object with search query
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with matching posts
 */
export const searchPosts = async (req: AuthRequest, res: Response) => {
  try {
    const { query } = req.query;
    const posts = await Post.find(
      { $text: { $search: query as string } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Could not search posts' });
  }
};
