const mongoose = require('mongoose');

const { Schema } = mongoose;


const ContactsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'Personal'
  },
  date: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('Contact', ContactsSchema);