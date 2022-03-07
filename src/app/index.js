const Koa = require("koa");
const KoaBody = require("koa-body");
const {userRouter} = require("../router/index");
const app = new Koa();
const koaRouter = require("koa-router");
const errHandler=require("./errHandler");
console.log("在app/index.js")
app.use(KoaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods()).use(()=>{
  console.log("中间件调用")
});
// app.use();
app.on("error",errHandler)
module.exports = app;
