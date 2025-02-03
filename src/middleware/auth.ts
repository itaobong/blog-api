import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../interfaces';

/**
 * Authentication Middleware
 * Validates JWT token and attaches user to request object
 * 
 * @param req - Extended Express Request object with user property
 * @param res - Express Response object
 * @param next - Express NextFunction to pass control to next middleware
 * 
 * @throws 401 Error - If no token provided
 * @throws 401 Error - If token is invalid
 * @throws 401 Error - If user no longer exists in database
 * 
 * @example
 * // Usage in routes
 * router.get('/protected-route', auth, controllerFunction);
 * 
 * // Expected Authorization header
 * Authorization: Bearer <jwt_token>
 */
export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-default-secret'
    ) as { id: string };
    
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};
