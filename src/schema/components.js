import mongoose from 'mongoose'
const componentSchema = new mongoose.Schema({
  title: {
    type: String
  },
  classify: {
    type: Object,
    ref: 'structures'
  },
  tag: {
    type: String
  },
  cover: {
    type: String
  },
  support: [{
    type: String
  }],
  code: {
    type: String
  },
  example: {
    type: String
  },
  document: {
    type: String
  },
  author: {
    type: Object,
    ref: 'users'
  },
  view: {
    type: Number,
    default: 0
  },
  download: {
    type: Number,
    default: 0
  },
  thumb: [{
    type: Object
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
})
const Component = mongoose.model('components', componentSchema)
module.exports = Component
