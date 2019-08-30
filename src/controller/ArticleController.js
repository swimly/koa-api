import User from '../schema/user'
import Article from '../schema/article'

export default class ArticleController {
  static async add (ctx) {
    let params = ctx.request.body
    if (params.title && params.content && params.classify) {
      const article = await Article.create(params)
      ctx.body = {
        status: 1,
        msg: '文章发布成功！',
        data: article
      }
    } else {
      ctx.body = {
        status: 0,
        msg: '标题，内容和分类为必填项！'
      }
    }
  }
  static async list (ctx) {
    const params = ctx.query
    const page = parseInt(params.page) - 1
    const pagesize = parseInt(params.pagesize)
    const total = await Article.find()
    const list = params.classify !== undefined ? 
    await Article.find({classify: params.classify}).skip(page*pagesize).limit(pagesize).populate({path: 'classify'}).populate({path: 'author'}) : 
    await Article.find().skip(page*pagesize).limit(pagesize).populate({path: 'classify'}).populate({path: 'author'});
    ctx.body = {
      status: 1,
      msg: '文章列表获取成功！',
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
    const result = await Article.findById(params.id).populate({path: 'author'}).populate({path: 'classify'})
    ctx.body = {
      status: 1,
      msg: '文章详情获取成功',
      data: result
    }
  }
}