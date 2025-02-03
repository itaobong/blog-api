import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces';

/**
 * User Schema Definition
 * Represents a user in the blog system
 * 
 * @field username - Unique username for the user (required, trimmed)
 * @field email - User's email address (required, unique, trimmed, lowercase)
 * @field password - Hashed password (required, automatically hashed before save)
 * @field bio - User's biography or description (optional)
 * @field following - Array of references to other users this user follows
 * @field timestamps - Automatically managed createdAt and updatedAt fields
 */
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

/**
 * Password Hash Middleware
 * Automatically hashes the password before saving if it has been modified
 * Uses bcrypt with a salt factor of 10
 * 
 * @middleware pre-save
 * @throws Error if password hashing fails
 */
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

/**
 * Compare Password Method
 * Validates a provided password against the stored hash
 * 
 * @method comparePassword
 * @param {string} password - The plain text password to compare
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 * 
 * @example
 * const isMatch = await user.comparePassword('plainTextPassword');
 */
UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
