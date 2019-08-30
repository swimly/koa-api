import mongoose from 'mongoose'
const articleSchema = new mongoose.Schema({
  title: {
    type: String
  },
  classify: {
    type: Object,
    ref: 'structures'
  },
  content: {
    type: String
  },
  cover: {
    type: String
  },
  comment: {
    type: Number,
    default: 0
  },
  tag: {
    type: String
  },
  public: {
    type: Boolean
  },
  thumb: [{
    type: Object,
    ref: 'users'
  }],
  author: {
    type: Object,
    ref: 'users'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})
const Article = mongoose.model('articles', articleSchema)
module.exports = Article
