import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [false, '用户名不能为空！']
  },
  username: {
    type: String,
    required: [true, '用户名不能为空！']
  },
  password: {
    type: String,
    required: [true, '密码不能为空！']
  },
  department: {
    type: Object,
    ref: 'structures'
  },
  email: {
    type: String,
    required: [true, '邮箱不能为空！']
  },
  avatar: {
    type: String
  },
  phone: {
    type: String
  },
  sex: {
    type: Number,
    default: 0
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})
const User = mongoose.model('users', userSchema)
module.exports = User
