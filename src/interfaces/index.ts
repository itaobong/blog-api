import { Document, Types } from 'mongoose';
import { Request } from 'express';

/**
 * Extended Request interface that includes authenticated user data
 * @extends Request
 */
export interface AuthRequest extends Request {
  user?: IUser;
}

/**
 * User interface defining the structure of a user document
 */
export interface IUser extends Document {
  /** Unique identifier for the user */
  _id: Types.ObjectId;
  /** Username for display and identification */
  username: string;
  /** User's email address for authentication */
  email: string;
  /** Hashed password for security */
  password: string;
  /** Optional bio for the user */
  bio?: string;
  /** Array of users the user is following */
  following: Types.ObjectId[];
  /**
   * Compare the provided password with the stored password
   * @param password Password to compare
   * @returns Promise resolving to true if passwords match, false otherwise
   */
  comparePassword(password: string): Promise<boolean>;
}

/**
 * Blog post interface defining the structure of a post document
 */
export interface IPost extends Document {
  /** Unique identifier for the post */
  _id: Types.ObjectId;
  /** Title of the blog post */
  title: string;
  /** Main content of the blog post */
  content: string;
  /** Reference to the user who created the post */
  author: Types.ObjectId;
  /** Array of comments associated with the post */
  comments: Types.ObjectId[];
  /** Timestamp of post creation */
  createdAt: Date;
  /** Timestamp of last post update */
  updatedAt: Date;
}

/**
 * Comment interface defining the structure of a comment document
 */
export interface IComment extends Document {
  /** Unique identifier for the comment */
  _id: Types.ObjectId;
  /** Content of the comment */
  content: string;
  /** Reference to the user who created the comment */
  author: Types.ObjectId;
  /** Reference to the post this comment belongs to */
  post: Types.ObjectId;
  /** Timestamp of comment creation */
  createdAt: Date;
  /** Timestamp of last comment update */
  updatedAt: Date;
}
