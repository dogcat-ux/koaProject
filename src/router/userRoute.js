const koaRouter = require("koa-router");
const UserController = require("../controller/userController");
const {auth} = require("../middleware/auth.middleware");
const {findUserExisted,userValidator,loginValidator,cryptPassword} = require("../middleware/user.middleware");
const userController = new UserController();
const userRouter = new koaRouter({prefix: '/users'})

userRouter.post('/register',userValidator,findUserExisted,cryptPassword,userController.register)
userRouter.post('/login',userValidator,loginValidator,userController.login)
userRouter.patch('/amendPwd',auth)

module.exports = userRouter
