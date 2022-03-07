const {createUser, getUserInfo} = require("../service/userService");
let runtimeLogger = require('../logs/log4')();
const common = require("../constants/return.common");
const {SuccessCode} = require("../constants/return.type");
const {catchErr} = require("../constants/return.type");
const jwt = require("jsonwebtoken");

class UserController {
  async register(ctx, next) {
    const {user_name, password} = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      ctx.body = common(SuccessCode, "创建用户成功", {user_name, password});
      runtimeLogger.info(`创建用户成功，res:${res}`);
    } catch (e) {
      runtimeLogger.error(`100创建用户失败${e}`);
      ctx.app.emit("error", catchErr, ctx);
    }
    await next();
  }

  async login(ctx, next) {
    const {user_name, password} = ctx.request.body;
    // 1.获取用户信息
    try {
      const res = await getUserInfo({user_name});
      ctx.body = common(
          SuccessCode,
          "用户登录成功",
          {
            token: jwt.sign(
                res,
                process.env.JWT_SECRET,
                {expiresIn: '1d'}),
            user_name,
            password: res?.password
          });
    } catch (e) {
      runtimeLogger.error(`用户登录失败:${e}`);
      ctx.app.emit("error", catchErr, ctx);
    }
  }
}

module.exports = UserController;
