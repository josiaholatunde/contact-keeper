const { loginUser, getUser } = require('../controllers/UsersController');

module.exports = app => {

  //@route POST /api/auth
  //@desc Get a logged in user
  //@access Private
  app.get('/api/auth', getUser);

    //@rouLog in user
  //@access Public
  app.post('/api/auth', loginUser);
}