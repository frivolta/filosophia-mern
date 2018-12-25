const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require ('../../config/keys');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
require('./../../config/passport')(passport);
/** Import Models */
const passportJWT = passport.authenticate('jwt', { session: false });


// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async(req, res)=>{
  const errors = {}
  const {name, email, password} = req.body;
  //Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser){
    errors.email = "Email already exists."
    return res.status(400).json(errors)
  } else {
    const avatar = gravatar.url(email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm', // Default
    });
    const user = new User({
      name,
      email,
      avatar,
      password,
    });
    try {
      // generate a salt
      const salt = await bcrypt.genSalt(10);
      // hash the password along with our new salt
      const hash = await bcrypt.hash(user.password, salt);
      // override the cleartext password with the hashed one
      user.password = hash;
      // save the new user
      const newUser = await user.save();
      return res.json(newUser);
    } catch (error) {
      throw error;
    }
  }
});


// @route   POST api/users/login
// @desc    Login User
// @access  Public
router.post('/login', async(req,res)=>{
  const errors  = {};
  const isValid = true;
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const {email, password} = req.body;
  try{
    //Find User by email
    const user = await User.findOne({ email });
    //Check for user
    if (!user){
      errors.email = 'Email not found';
      return res.status(400).json(errors);
    }
    //Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      errors.email = 'Invalid Password';
      return res.status(400).json(errors);
    }
    //If user matched create a JWT payload
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    }
    //Sign token
    const token = await jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600});
    return res.json({success: true, token: `Bearer ${token}`});
  } catch (err) {
    throw err;
  }
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current',passportJWT, (req, res)=>{
  res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
  })
});


/**Import controllers */
module.exports = router;