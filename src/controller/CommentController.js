import Comment from '../schema/comment'
import mongoose from 'mongoose'
import Plugin from '../plugin'
class CommentController {
  static async list(ctx) {
    const params = ctx.query
    const list = params.topic ? await Comment.find({topic: params.topic}) : await Comment.find();
    ctx.body = {
      status: 1,
      data: Plugin.arrayToTree(list, '_id', 'parentId', 'children')
    }
  }
  static async commentlist (ctx) {
    const params = ctx.query
    console.log(await Comment.find())
    const list = await Comment.find({relation: params.relation}).populate({path: 'author'})
    ctx.body = {
      status: 1,
      data: Plugin.arrayToTree(list, '_id', 'parentId', 'children'),
      msg: '评论列表获取成功'
    }
  }
  static async add(ctx) {
    const params = ctx.request.body;
    if (params.parentId) {
      params.parentId = mongoose.Types.ObjectId(params.parentId);
    } else {
      delete params.parentId
    }
    const result = await Comment.create(params);
    ctx.body = {
      status: 1,
      data: result,
      msg: '添加成功！'
    };
  }
}
export default CommentController