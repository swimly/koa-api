import User from '../schema/user'
import Structure from '../schema/structure'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {secret} from '../config'
class UserController {
  static async register (ctx, next) {
    const params = ctx.request.body;
    try {
      if (!params.username || !params.password) {
        ctx.status = 400

        ctx.body = {
          error: `exppected an object with username,password but got: ${params}`
        }
        return;
      }
      params.password = await bcrypt.hash(params.password, 5);
      let user = await User.find({username: params.username});
      if (!user.length) {
        const newUser = new User(params);
        const current = await Structure.updateOne({
          '_id': params.department
        }, {
          '$push': {
            member: newUser._id
          }
        })
        user = await newUser.save();
        ctx.status = 200;
        ctx.body = {
          status: 1,
          msg: '注册成功！',
          data: user
        }
      } else {
        ctx.status = 406;
        ctx.body = {
          status: 0,
          msg: '用户名已经存在'
        }
      }
    } catch (error) {
      ctx.body = {
        msg: '参数错误'
      }
    }
  }
  static async login (ctx, next) {
    const params = ctx.request.body;
    try {
      const user = await User.findOne({username: params.username})
      if (!user) {
        ctx.status = 401
        ctx.body = {
          status: 0,
          msg: '用户名错误！'
        }
        return;
      }
      if (await bcrypt.compare(params.password, user.password)) {
        const token = jwt.sign({
          data: {
            _id: user._id
          },
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 8)
        }, secret);
        user.token = token;
        user.save();
        ctx.status = 200
        ctx.body = {
          status: 1,
          msg: '登录成功！',
          token: token
        }
      } else {
        ctx.status = 401
        ctx.body = {
          status: 0,
          msg: '密码错误！'
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }
  static async getUsers (ctx) {
    let users = await User.find();
    ctx.body = {
      data: users.length ? users : null
    }
  }
  static async me (ctx) {
    const token = ctx.request.header.token
    const info = jwt.verify(token, secret);
    const id = info.data._id
    const user = await User.findById(id);
    ctx.body = {
      status:1,
      data: user,
      msg: '个人信息获取成功！'
    }
  }
  static async logout (ctx) {
    const token = ctx.request.header.token
    const info = jwt.verify(token, secret);
    const id = info.data._id
    const user = await User.update({_id: id}, {
      $unset: {
        token: ''
      }
    });
    ctx.body = {
      status:1,
      data: user,
      msg: '退出登录！'
    }
  }
}

export default UserController;
