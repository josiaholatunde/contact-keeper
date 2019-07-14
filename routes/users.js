const { registerUser } = require('../controllers/UsersController');

module.exports = app => {

  //@route POST /api/users
  //@desc Register a user
  //@access Public
  app.post('/api/users', registerUser);
}