import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

/**
 * Authentication Routes
 * Base path: /auth
 * 
 * POST /register
 * Register a new user
 * @body {
 *   username: string,
 *   email: string,
 *   password: string,
 *   bio?: string
 * }
 * @returns {
 *   user: {
 *     id: string,
 *     username: string,
 *     email: string,
 *     bio: string
 *   },
 *   token: string
 * }
 * @throws 400 - If username/email already exists or validation fails
 * 
 * POST /login
 * Authenticate existing user
 * @body {
 *   email: string,
 *   password: string
 * }
 * @returns {
 *   user: {
 *     id: string,
 *     username: string,
 *     email: string,
 *     bio: string
 *   },
 *   token: string
 * }
 * @throws 401 - If credentials are invalid
 */

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
