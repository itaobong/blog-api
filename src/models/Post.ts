import mongoose, { Schema } from 'mongoose';
import { IPost } from '../interfaces';

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

// Add text index for search functionality
PostSchema.index({ title: 'text', content: 'text' });

export default mongoose.model<IPost>('Post', PostSchema);
