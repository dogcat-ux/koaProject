const {  DataTypes } = require('sequelize');
const seq = require("../db/seq")
const User = seq.define('user', {
//   在这里定义模型属性
  user_name: {
    type: DataTypes.STRING,
    unique:true,
    allowNull: false
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull:false,
  },
  role:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:0,
      comment:"0是普通用户，1是管理员"
  }
}, {
    freezeTableName: true
  });

// User.sync();
module.exports=User;
