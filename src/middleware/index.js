import jwt from 'jsonwebtoken'
import { secret } from '../config'
import User from '../schema/user'
import fs from 'fs'
import Plugin from '../plugin'

export default class Mid {
  // 图片验证码校验
  static verifacationCode() {
    return async (ctx, next) => {
      console.log(ctx.request.body.captcha, ctx.session)
      const isCorrect = ctx.request.body.captcha.toLowerCase() === ctx.session.captcha.toLowerCase()
      if (!isCorrect) {
        ctx.body = {
          status: 0,
          msg: '验证码错误！'
        }
        return;
      }
      await next()
    }
  }
  static verifacationAuth() {
    // 验证登录信息
    return async (ctx, next) => {
      try {
        let token = ctx.request.header.token
        let decoded = jwt.verify(token, secret)
        const loginUser = await User.findById(decoded.data._id)
        ctx.state.user = loginUser
      } catch (err) {
        ctx.body = {
          status: 0,
          msg: '缺失token，或者token过期，请重新登录！'
        }
        return;
      }
      await next();
    }
  }
  static upload(name) {
    // 文件上传
    return async (ctx, next) => {
      const file = ctx.request.files[name]
      const reader = fs.createReadStream(file.path); // 创建可读流
      const ext = file.name.split('.').pop(); // 获取上传文件扩展名
      const filename = `${new Date().Format("yyyyMMdd")}${Math.random().toString(36).substr(2)}.${ext}`;
      const folder = fs.existsSync(`src/public/${name}`) || fs.mkdirSync(`src/public/${name}`)
      const upStream = fs.createWriteStream(`src/public/${name}/${filename}`);
      reader.pipe(upStream);
      const result = {
        filename: filename,
        size: Plugin.renderFileSize(file.size),
        type: file.type,
        path: `${name}/${filename}`,
        ext: ext,
        url: `http://${ctx.request.header.host}/${name}/${filename}`,
        created_at: new Date()
      }
      ctx.state.upload = result
      await next()
    }
  }
  static base64(name) {
    return async (ctx, next) => {
      var data = ctx.request.body.base64;
      fs.existsSync(`src/public/${name}`) || fs.mkdirSync(`src/public/${name}`)
      var folder = `src/public`
      var path = `${name}/${new Date().Format("yyyyMMdd")}${Math.random().toString(36).substr(2)}.png`;
      var base64 = data.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
      var dataBuffer = new Buffer.from(base64, 'base64'); //把base64码转成buffer对象，
      console.log('dataBuffer是否是Buffer对象：' + Buffer.isBuffer(dataBuffer));
      fs.writeFile(`${folder}/${path}`, dataBuffer, function (err) {//用fs写入文件
        if (err) {
          console.log(err);
        } else {
          console.log(path)
        }
      })
      ctx.state.base64 = {
        path: path,
        url: `http://${ctx.request.header.host}/${path}`,
        created_at: new Date()
      }
      await next()
    }
  }
}


Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}