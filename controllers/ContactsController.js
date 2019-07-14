const Contacts = require('../models/Contact');
const {  validationResult } = require('express-validator');

exports.getUserContacts = (req, res, next) => {
  const {id} = req.user;
  try {
    const contacts = await Contacts.find({user: id}).sort({date: -1}); 
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}


exports.addContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const {name, email, phone, type} = req.body;

  try {
    const contact = new Contacts({
      name,
      email,
      phone,
      type,
      user: req.user.id
    })
    await contact.save();
    return res.status(201).json(contact);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
  res.json({msg: 'Add contacts'})
}

exports.updateContact = async (req, res, next) => {
  const {name, email, phone, type} = req.body;
 try {
   const contact = await Contacts.findById(req.params.id);
   if (!contact) return res.status(404).json({msg: 'No Contact Found'});

   if (contact.user.toString() !== req.user.id) {
     return res.status(401).json({msg: 'Not Authorized'});
   }
   const contactsField = {};
   if (name) contactsField.name = name;
   if (email) contactsField.email = email;
   if (phone) contactsField.phone = phone;
   if (type) contactsField.type = type;

   contact = await Contacts
                    .findByIdAndUpdate(req.params.id, 
                    {$set: contactsField}, 
                    {new: true});
    return res.status(200).json(contact);
 } catch (error) {
   console.error(error.message);
   return res.status(500).send('Server Error');
 }
}

exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) return res.status(404).json({msg: 'No Contact Found'});
 
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not Authorized'});
    }

    await Contacts.findByIdAndRemove(req.params.id);
    return res.json({msg: 'Contact deleted'});
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')

  }
}