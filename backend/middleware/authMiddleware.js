const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found.' });
      }
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Access denied, invalid token signature.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No authorization token supplied.' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access forbidden: ${req.user?.role || 'Guest'} role has insufficient permissions.` });
    }
    next();
  };
};

module.exports = { protect, authorize };