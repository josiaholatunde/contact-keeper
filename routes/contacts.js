const { getUserContacts, addContact, updateContact, deleteContact } = require('../controllers/ContactsController');

module.exports = app => {

  //@route GET /api/contacts
  //@desc Get a users contacts
  //@access Private
  app.post('/api/contacts', getUserContacts);

  //@route POST /api/contacts
  //@desc Add  a contact
  //@access Private
  app.post('/api/contacts', addContact);


  //@route PUT /api/contacts/:id
  //@desc Update a users contacts
  //@access Private
  app.put('/api/contacts/:id', updateContact);

  //@route DELETE /api/contacts/:id
  //@desc Delete a users contacts
  //@access Private
  app.delete('/api/contacts/:id', deleteContact);
}