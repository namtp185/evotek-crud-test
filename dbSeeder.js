const User = require("./models/User");
const userService = require("./api/user.service");
const { users } = require("./dbMock");

const seedData = async () => {
  await seedUsers();
};

const seedUsers = async () => {
  console.log(users);
  const promises = users.map(user => {
    return userService.create(user);
  })
  await Promise.all(promises);
};

module.exports = seedData;