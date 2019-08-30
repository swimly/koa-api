import svgCaptcha from 'svg-captcha'
export default class VerificationController {
  static async captcha (ctx) {
    let captcha = svgCaptcha.create({
      noise: 4,
      color: true,
      background: '#eee',
      width:120,
      height:40
    });
    ctx.session.captcha = captcha.text;
    console.log(ctx.session)
    ctx.body = captcha.data;
  }
}
