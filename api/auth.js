const jwtSign = require("jsonwebtoken");
const jwt = require("express-jwt");
require("dotenv").config();
const { users } = require("../dbMock");

const secret = process.env.SECRET_KEY;

// encode token from role, id and secret key
const authenticate = async ({username, password}) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
      const token = jwtSign.sign({ sub: user.id, role: user.role }, secret);
      const { password, ...userWithoutPassword } = user;
      return {
          ...userWithoutPassword,
          token
      };
  }
};

// decode role from token and secret key
const authorize = (requiredRoles = []) => {
  // requiredRoles param can be a single role string (e.g. Role.User or 'User') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof requiredRoles === 'string') {
    requiredRoles = [requiredRoles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret, algorithms: ['HS256'] }),

    (err, req, res, next) => {
      if(err) {
        // pass error to router to catch
        next(err);
        return;
      }
      // if roles are required and user role is not in required roles
      if (requiredRoles.length && !requiredRoles.includes(req.user.role)) {
          // then user's role is not authorized
          return res.status(401).json({ message: 'Unauthorized' });
      }

      // authentication and authorization successful
      next();
    }
  ];
};

module.exports = {
  authenticate,
  authorize,
}