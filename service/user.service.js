const { users } = require("../dbMock");
const User = require("../models/User");

const getAll = async () => {
  return User.find({})
              .select(["-password", "-date", "-__v", "-_id"])
              .lean()
              .exec();
};

const getByUsername = async (username) => {
  return User.findOne({username: username})
            .select(["-password", "-date", "-__v", "-_id"])
            .lean()
            .exec();
};

const create = async (user) => {
  const { username, email } = user;
  let userExisted = await User.findOne({
    $or: [{username: username}, {email: email}]
  })
    .exec()
    ;

  if(userExisted) {
    return Promise.reject(new Error('Object duplicate key'));
  }

  const userInstance = new User(user);

  return await userInstance.save();
}

module.exports = {
  getAll,
  getByUsername,
  create,
}