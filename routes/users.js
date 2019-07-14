const { registerUser } = require('../controllers/UsersController');
const { check } = require('express-validator');

module.exports = app => {

  //@route POST /api/users
  //@desc Register a user
  //@access Public
  app.post('/api/users',[
    check('name', 'Name field is required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Password field must have a minimum length of 7 characters').isLength({min: 7}),
  ], registerUser);
}