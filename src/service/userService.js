// import User from "../model/user.model";
const User = require("../model/user.model");

class UserService {
  async createUser(user_name, password) {
    return await User.create({user_name, password});
  }

  // async findUser(user_name) {
  //   return await User.findOne({where: {user_name}});
  // }

  async getUserInfo({user_name, id, password, role}) {
    let whereOpt = {};
    id && Object.assign(whereOpt, {id})
    user_name && Object.assign(whereOpt, {user_name})
    password && Object.assign(whereOpt, {password})
    role && Object.assign(whereOpt, {role})
    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'role'],
      where: whereOpt
    })
    return res ? res?.dataValues : null;
  }
}

module.exports = new UserService();
