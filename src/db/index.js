import mongoose from 'mongoose'
import config from '../config'
class db {
  static async connect () {
    mongoose.connect(config.db.host, {
      useNewUrlParser: true
    })
    mongoose.connection.on('error', error => {
      console.log('数据库连接失败!', error)
    })
  
    // 连接成功
    mongoose.connection.once('open', () => {
      console.log('数据库连接成功!')
    })
  }
}
module.exports = db
