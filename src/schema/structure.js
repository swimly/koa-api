import mongoose from 'mongoose'
const structureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [false, '用户名不能为空！']
  },
  topic: {
    type: String
  },
  parentId: {
    type: Object
  },
  member: [
    {
      type: Object,
      ref: 'users'
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
})
const Structure = mongoose.model('structures', structureSchema)
module.exports = Structure
