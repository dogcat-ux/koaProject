const koaBody = require("koa-body");

const app=new koaBody();
module.exports=(err,ctx)=>{
    let status;
    switch(err.code){
        case 10001:
            status=409
            break;
        case 11001:
            status=500
            break;
        default:
            status=200
    }
    ctx.status=status;
    ctx.body=err;
}
