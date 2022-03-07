let runtimeLogger = require('../logs/log4')();
const {userFormatError} = require("../constants/return.type");
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const {catchErr, userInfoErr, userNotExist, SuccessCode} = require("../constants/return.type");
const {userExisted} = require("../constants/return.type");
const {getUserInfo, findUser} = require("../service/userService");
const common = require("../constants/return.common");

const userValidator = async (ctx, next) => {
  const schema = Joi.object({
    user_name: Joi.string().alphanum().min(3).max(16).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,16}$/).required(),
  })
  let value = schema.validate(ctx.request.body);
  if (value.error) {
    ctx.app.emit("error", userFormatError, ctx);
    runtimeLogger.warn(`userFormatError${value}`);
  } else {
    await next();
  }
}

const findUserExisted = async (ctx, next) => {
  const {user_name} = ctx.request.body;
  try {
    const findUserRes = await getUserInfo({user_name});
    runtimeLogger.info(`100-findUserRes:${findUserRes}`);
    if (findUserRes) {
      ctx.app.emit("error", userExisted, ctx);
    } else {
      await next();
    }
  } catch (e) {
    runtimeLogger.error(`100-查看用户是否存在出错{e}`);
    ctx.app.emit("error", catchErr, ctx);
  }
}

const cryptPassword = async (ctx, next) => {
  const {password} = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  ctx.request.body.password = bcrypt.hashSync(password, salt);
  await next();
}

const loginValidator = async (ctx, next) => {
  const {user_name, password} = ctx.request.body;
  try {
    const res = await getUserInfo({user_name});
    if (res && bcrypt.compareSync(password, res?.password||'')) {
      await next();
    } else {
      ctx.app.emit("error", userInfoErr, ctx);
      runtimeLogger.warn(`100用户名或密码错误`);
    }
  } catch (e) {
    runtimeLogger.error(`100用户登录失败${e}`);
    ctx.app.emit("error", catchErr, ctx);
  }
}

module.exports = {
  userValidator, findUserExisted, cryptPassword, loginValidator
}
