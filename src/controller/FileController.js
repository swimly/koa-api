var PSD = require('psd')
import User from '../schema/user'
import fs from 'fs'
import unzipper from 'unzipper'

export default class FileController {
  static async uploadfile(ctx) {
    ctx.body = ctx.state.upload
  }
  static async base64 (ctx) {
    console.log(ctx.state)
    ctx.body = ctx.state.base64
  }
  static async avatar (ctx) {
    let user = await User.update({
      '_id': ctx.state.user._id
    }, {
      'avatar': ctx.state.base64.path
    })
    if (user) {
      ctx.body = {
        status: 1,
        msg: '头像更新成功！'
      }
    }
  }
  static async uploadPsd (ctx) {
    // const result = ctx.state.upload
    var psd = PSD.fromFile(`./psd/hah.psd`)
    ctx.body = psd.tree().childrenAtPath('A/B/C')[0].export()
  }
  static async uploadZip (ctx) {
    let path = `./src/public/${ctx.state.upload.path}`
    if (fs.existsSync(path)) {
      const result = fs.createReadStream(path).pipe(unzipper.Extract({path: './src/public'}))
      ctx.body = result
    }
  }
}