const { users } = require("../dbMock");
const User = require("../models/User");

const getAll = async () => {
  return users.map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
};

const getById = async (id) => {
  const user = users.find(u => u.id === parseInt(id));
  if (!user) return;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
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
  getById,
  create,
}