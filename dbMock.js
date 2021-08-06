const roles = require("./models/Roles");

// Prettier
// https://jsonformatter.curiousconcept.com/#

const users = [
  {
    "id":1,
    "email":"admin@admin.com",
    "username":"admin",
    "password":"admin",
    "firstName":"Admin",
    "lastName":"User",
    "role":roles.Admin
  },
  {
    "id":2,
    "email":"user@user.com",
    "username":"user",
    "password":"user",
    "firstName":"Normal",
    "lastName":"User",
    "role":roles.User
  },
  {
    "id":3,
    "email":"party@party.com",
    "username":"thirdparty",
    "password":"thirdparty",
    "firstName":"ThridParty",
    "lastName":"User",
    "role":roles.ThirdParty
  },
  {
    "id":4,
    "email":"party1@party.com",
    "username":"thirdparty2",
    "password":"thirdparty",
    "firstName":"ThridParty",
    "lastName":"User",
    "role":roles.ThirdParty
  }
];

const profiles = [
  {
    "user":{
      "$oid":"61074e937d716e52bbdaa6a5"
    },
    "__v":{
      "$numberInt":"0"
    },
    "bio":"An ordinary student trying to solve problems.",
    "company":"evotek",
    "date":{
      "$date":{
        "$numberLong":"1627868917337"
      }
    },
    "education":[
      
    ],
    "experience":[
      
    ],
    "githubusername":"namtp185",
    "location":"HN, VN",
    "skills":[
      " Java",
      " Javascript",
      " Python"
    ],
    "social":{
      "youtube":"",
      "twitter":"",
      "instagram":"",
      "linkedin":"",
      "facebook":""
    },
    "status":"Junior Developer",
    "website":"https://namtp185.github.io"
  }
];

module.exports = {
  users,
}