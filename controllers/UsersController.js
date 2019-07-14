const {  validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/keys');


exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  try {
    const {name, email, password} = req.body;
    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json({msg: 'Username already exists!'});
    }
    user = new User({
      name,
      email
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const createdUser = await user.save();

    const userPayload = {
      user: {
        id: createdUser._id
      }
    }
    jwt.sign(
      userPayload, 
      jwtSecret, 
      {expiresIn: '1h'}, 
      (err, token) => {
        return res
        .status(201)
        .json({
          user: {
            ...createdUser._doc, 
            password: null
          }, 
          token
        });
    })

  } catch (error) {
    return res.status(500).json(error);
  }
  
}

exports.getUser = async (req, res, next) => {
  try {
    const {id} = req.user;
    const user = await User.findById(id).select('-password');
    if (!user) {
      res.status(404).json({msg: 'No User Found with that id'});
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }

}


exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const {email, password} = req.body;
    let user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({msg: 'Invalid Credentials'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({msg: 'Invalid Credentials'});
    }

    const userPayload = {
      user: {
        id: createdUser._id
      }
    }

    jwt.sign(
      userPayload, 
      jwtSecret, 
      {expiresIn: '1h'}, 
      (err, token) => {
        return res
        .status(201)
        .json({
          user: {
            ...createdUser._doc, 
            password: null
          }, 
          token
        });
    })


  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }

}