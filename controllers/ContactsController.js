const Contacts = require('../models/Contact');
const {  validationResult } = require('express-validator');

exports.getUserContacts = async (req, res, next) => {
  const {id} = req.user;
  try {
    const contacts = await Contacts.find({user: id}).sort({date: -1}); 
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}


exports.addContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const {name, email, phone, type} = req.body;
  const user = req.user;
  try {
    const contactFromDb = await Contacts.findOne({ email, user: user.id });
    if (contactFromDb) {
      return res.status(400).json({msg: 'Contact Exists'});
    }

    let displayImageUrl;
    if (!!await req.files) {
      const files = await req.files;
      if (files.length > 0) {
       displayImageUrl = req.files[0].url;
       contactsField.displayImageUrl = displayImageUrl
      }
    }

    const contact = new Contacts({
      name,
      email,
      phone,
      type,
      displayImageUrl,
      user: user.id
    })
    

    await contact.save();
    return res.status(201).json(contact);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
}

exports.updateContact = async (req, res, next) => {
  const {name, email, phone, type} = req.body;
 try {
   let contact = await Contacts.findById(req.params.id);
   if (!contact) return res.status(404).json({msg: 'No Contact Found'});

   if (contact.user.toString() !== req.user.id) {
     return res.status(401).json({msg: 'Not Authorized'});
   }
   const contactsField = {};
   if (name) contactsField.name = name;
   if (email) contactsField.email = email;
   if (phone) contactsField.phone = phone;
   if (type) contactsField.type = type;

   let displayImageUrl;
   if (!!await req.files) {
     const files = await req.files;
     if (files.length > 0) {
      displayImageUrl = req.files[0].url;
      contactsField.displayImageUrl = displayImageUrl
     }
   }

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