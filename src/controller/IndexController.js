class IndexController {
  static async test (ctx, next) {
    ctx.body = {
      msg: '这是LCDC接口，欢迎使用该文档，你准备好了吗？'
    }
  }
  static async wechat (ctx, next) {
    console.log(ctx)
  }
}

export default IndexController;
