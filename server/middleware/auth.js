// server/middleware/auth.js

const authMiddleware = (req, res, next) => {
    // Dummy authentication check
    console.log('Auth middleware triggered');
    next();
  };
  
  module.exports = authMiddleware;
  