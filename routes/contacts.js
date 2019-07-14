const { getUserContacts, addContact, updateContact, deleteContact } = require('../controllers/ContactsController');
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

module.exports = app => {

  //@route GET /api/contacts
  //@desc Get a users contacts
  //@access Private
  app.get('/api/contacts', auth, getUserContacts);

  //@route POST /api/contacts
  //@desc Add  a contact
  //@access Private
  app.post('/api/contacts', [ 
    auth, 
    [
      check('name', 'Name field is required')
    ]
  ], addContact);


  //@route PUT /api/contacts/:id
  //@desc Update a users contacts
  //@access Private
  app.put('/api/contacts/:id', auth, updateContact);

  //@route DELETE /api/contacts/:id
  //@desc Delete a users contacts
  //@access Private
  app.delete('/api/contacts/:id', auth,  deleteContact);
}