import Structure from '../schema/structure'
import mongoose from 'mongoose'
import Plugin from '../plugin'
class StructureController {
  static async list(ctx) {
    const params = ctx.query
    const list = params.topic ? await Structure.find({topic: params.topic}) : await Structure.find();
    ctx.body = {
      status: 1,
      data: Plugin.arrayToTree(list, '_id', 'parentId', 'children')
    }
  }
  static async structurelist (ctx) {
    const params = ctx.query
    const list = params.topic ? await Structure.find({topic: params.topic}).populate({path: 'member'}) : await Structure.find().populate({path: 'member'});
    ctx.body = {
      status: 1,
      data: Plugin.arrayToTree(list, '_id', 'parentId', 'children')
    }
  }
  static async add(ctx) {
    const params = ctx.request.body;
    if (params.parentId) {
      params.parentId = mongoose.Types.ObjectId(params.parentId);
    }
    const result = await Structure.create(params);
    ctx.body = {
      status: 1,
      data: result,
      msg: '添加成功！'
    };
  }
  static async addMember (ctx) {
    const params = ctx.request.body;
    const current = await Structure.update({
      '_id': params.id
    }, {
      '$push': {
        member: params.member
      }
    })
    if (current.ok) {
      ctx.body = {
        status: 1,
        msg: `成功添加${current.nModified}个成员！`
      }
    }
  }
  static async delMember (ctx) {
    const params = ctx.request.body;
    const current = await Structure.updateOne({
      '_id': params.id
    }, {
      '$pull': {
        member: params.member
      }
    })
    if (current.ok) {
      ctx.body = {
        status: 1,
        msg: `成功移除${current.nModified}个成员！`
      }
    }
  }
  static async delete (ctx) {
    const params = ctx.request.body;
    const id = params.id.split(',')
    const result = await Structure.remove({
      $or: [
        {
          _id: {
            $in: id
          }
        },
        {
          parentId: {
            $in: id
          }
        }
      ]
    });
    if (result.deletedCount) {
      ctx.body = {
        status: 1,
        msg: `成功删除${result.deletedCount}条数据！`
      }
    } else {
      ctx.body = {
        status: 0,
        msg: '没有该条数据，删除失败！'
      }
    }
  }
}
export default StructureController