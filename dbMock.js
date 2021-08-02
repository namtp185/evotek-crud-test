const roles = require("./models/Roles");

const users = [
  { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: roles.Admin },
  { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: roles.User },
  { id: 3, username: 'thirdparty', password: 'thirdparty', firstName: 'ThridParty', lastName: 'User', role: roles.ThirdParty },
  { id: 4, username: 'thirdparty', password: 'thirdparty', firstName: 'ThridParty', lastName: 'User', role: roles.ThirdParty },
];

module.exports = {
  users,
}