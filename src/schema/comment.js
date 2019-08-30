import mongoose from 'mongoose'
const commentSchema = new mongoose.Schema({
  classify: {
    type: String
  },
  relation: {
    type: String
  },
  parentId: {
    type: Object
  },
  content: {
    type: String
  },
  author: {
    type: Object,
    ref: 'users'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})
const Comment = mongoose.model('comments', commentSchema)
module.exports = Comment
