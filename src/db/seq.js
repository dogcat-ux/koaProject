const {
  Sequelize
} = require('sequelize');
var runtimeLogger  = require('../logs/log4')();
const to=require("await-to-js").default;
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require("../config/config.default");
console.log("MYSQL_DB",MYSQL_DB)
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  port:MYSQL_PORT,
  dialect: 'mysql'
})
const connect=async ()=>{
  let [err,res]=await to(seq.authenticate());
  if(err){
    runtimeLogger.error(`连接数据库:${err}`)
  }else{
    runtimeLogger.info(`连接数据库成功:${res}`)
  }
}
connect();
module.exports=seq;
