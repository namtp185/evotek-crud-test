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
    return {};
  }

  const userInstance = new User(user);

  await userInstance.save();
  return user;
}

module.exports = {
  getAll,
  getByUsername,
  create,
}