const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/keys');
module.exports = (req, res, next) => {
  //Get token from header
  const token = req.header('x-auth-token') && req.header('x-auth-token');


  //Check if not token
  if (!token) {
    return res.status(401).json({msg: 'No Token, Authorization denied'});
  }
  try {
    const decodedPayload = jwt.verify(token, jwtSecret);
    req.user = decodedPayload.user;
    
    return next();
  } catch (error) {
    return res.status(401).json({msg: 'Invalid token'});
  }
}