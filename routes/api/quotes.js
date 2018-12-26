const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require ('../../config/keys');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const Quote = require('../../models/Quote');
require('./../../config/passport')(passport);
/** Import Models */
const passportJWT = passport.authenticate('jwt', { session: false });
/** Import Validation */
const validateQuoteInput = require('./../../validation/quote');

/**
 * Routes:
 * -------------------------------------------------------
 * POST api/quotes - Add a new quote
 * GET api/quotes - Get all quotes
 * *GET api/quotes/:cat - Get quote by category id
 * *GET api/quotes/loved/:id - Get loved quotes by user id
 * DELETE api/quotes/:id - Remove quote
 * *POST api/quotes/like/:id - Like quote by id
 * *POST api/quotes/unlike/:id - Unlike quote by id
 * 
 * -------------------------------------------------------
 */


// @route   POST api/quotes
// @desc    Add a new quote
// @access  Private
router.post('/',passportJWT, async(req, res)=>{
  const {errors, isValid} = validateQuoteInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  const {text, category} = req.body;
    const quote = new Quote({
     text,
     category
    });
    try {
      const newQuote = await quote.save();
      return res.json(newQuote);
    } catch (error) {
      throw error;
    }
  });

/**Router Middleware */
module.exports = router;