const { loginUser, getUser, verifyLoggedInUser } = require('../controllers/UsersController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');
const passport = require('passport')
const { clientUrl } = require('../config/keys')

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

  app.get('/auth/google', passport.authenticate('google', { scope: ['email profile']}));
  app.get('/auth/google-login/callback', passport.authenticate('google', {failureRedirect: clientUrl, successRedirect: clientUrl}))
  app.get('/auth/current-user', verifyLoggedInUser)
}