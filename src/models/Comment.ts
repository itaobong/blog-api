import mongoose, { Schema } from 'mongoose';
import { IComment } from '../interfaces';

/**
 * Comment Schema Definition
 * Represents a comment on a blog post
 * 
 * @field content - The text content of the comment (required)
 * @field author - Reference to the User who created the comment (required)
 * @field post - Reference to the Post the comment belongs to (required)
 * @field timestamps - Automatically managed createdAt and updatedAt fields
 * 
 * @relations
 * - Belongs to one Post (post field)
 * - Created by one User (author field)
 * - Referenced in Post.comments array
 */
const CommentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IComment>('Comment', CommentSchema);
