import mongoose, { Schema } from 'mongoose';
import { IPost } from '../interfaces';

/**
 * Post Schema Definition
 * Represents a blog post in the system
 * 
 * @field title - The title of the blog post (required, trimmed)
 * @field content - The main content of the blog post (required)
 * @field author - Reference to the User who created the post (required)
 * @field comments - Array of references to Comment documents associated with this post
 * @field timestamps - Automatically managed createdAt and updatedAt fields
 */
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

/**
 * Text Index Configuration
 * Enables full-text search functionality on title and content fields
 * Usage: Model.find({ $text: { $search: "search term" } })
 */
PostSchema.index({ title: 'text', content: 'text' });

export default mongoose.model<IPost>('Post', PostSchema);
