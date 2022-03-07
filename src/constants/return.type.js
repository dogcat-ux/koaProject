const common = require("./return.common");
module.exports={
    // 第一个数字代表前后台
    // 第2，3个数字代表模块
    // 最后两个数字代表具体错误
    SuccessCode:0,
    TokenErrCode:101,
    Success:common(0,"",""),
    /*授权模块101*/
    tokenExpires:common(10101,"token过期",""),
    tokenInvalid:common(10102,"token无效",""),
    /*用户模块100*/
    userFormatError:common(10002,"用户名或密码不符合格式",""),
    userExisted:common(10003,"该用户名已经存在",""),
    userNotExist:common(10004,"该用户名不存在",""),
    userInfoErr:common(10005,"用户名或密码错误",""),

    /*统一的错误抛出110*/
    catchErr:common(11001,"错误抛出",""),
}
