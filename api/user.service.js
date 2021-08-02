const { users } = require("../dbMock");

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

module.exports = {
  getAll,
  getById,
}