const { loginUser, getUser } = require('../controllers/UsersController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

module.exports = app => {

  //@route POST /api/auth
  //@desc Get a logged in user
  //@access Private
  app.get('/api/auth', auth, getUser);

    //@rouLog in user
  //@access Public
  app.post('/api/auth', [
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Password field must have a minimum length of 7 characters').isLength({min: 7}),
  ], loginUser);
}