import User from '../schema/user'
import Structure from '../schema/structure'
import Component from '../schema/components'

export default class ComponentController {
  static async add (ctx) {
    let params = ctx.request.body
    params.author = ctx.state.user._id
    let result = await Component.create(params)
    ctx.body = {
      status: 1,
      msg: '组件发布成功！',
      data: result,
    }
  }
  static async list (ctx) {
    const params = ctx.query
    const page = parseInt(params.page) - 1
    const pagesize = parseInt(params.pagesize)
    const total = await Component.find()
    const list = params.classify !== undefined ? 
    await Component.find({classify: params.classify}).skip(page*pagesize).limit(pagesize).populate({path: 'classify'}).populate({path: 'author'}) : 
    await Component.find().skip(page*pagesize).limit(pagesize).populate({path: 'classify'}).populate({path: 'author'});
    ctx.body = {
      status: 1,
      msg: '组件列表获取成功！',
      data: {
        list: list,
        total: total.length,
        page: page,
        pagesize: pagesize,
        nextPage: page + 1,
        prevPage: page - 1
      }
    }
  }
  static async detail (ctx) {
    const params = ctx.query
    console.log(params)
    const result = await Component.findById(params.id).populate({path: 'author'}).populate({path: 'classify'})
    ctx.body = {
      status: 1,
      msg: '组件详情获取成功',
      data: result
    }
  }
}