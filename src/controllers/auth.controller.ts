import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../interfaces';

/**
 * Authentication Controller
 * Handles user registration, login, and token management
 */

/**
 * Register a new user
 * @param {AuthRequest} req - Express request object containing user registration data
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with user data or error message
 */
export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET || 'your-default-secret'
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

/**
 * Login user and generate JWT token
 * @param {AuthRequest} req - Express request object containing login credentials
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} JSON response with JWT token or error message
 * @throws {Error} When credentials are invalid or user not found
 */
export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET || 'your-default-secret'
    );

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};
