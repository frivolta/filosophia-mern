const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const Quote = require('../../models/Quote');
require('./../../config/passport')(passport);
/** Import Models */
const passportJWT = passport.authenticate('jwt', {
  session: false
});
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
router.post('/', passportJWT, async (req, res) => {
  const {
    errors,
    isValid
  } = validateQuoteInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Make quote
  const quote = new Quote({
    text: req.body.text,
    category: req.body.category,
    avatar: req.body.avatar,
    user: req.user.id,
    username: req.user.name
  });
  try {
    const newQuote = await quote.save();
    return res.json(newQuote);
  } catch (error) {
    throw error;
  }
});

// @route   GET api/quotes
// @desc    Get all quotes
// @access  Private
router.get('/', passportJWT, async (req, res) => {
  const errors = {};
  try {
    const allQuotes = await Quote.find({}).sort({
      date: -1
    })
    res.json(allQuotes);
  } catch (error) {
    errors.noquotes = 'No quotes found';
    return res.status(404).json(errors);
  }
});

// @route   DELETE api/quotes/:id
// @desc    Remove quote by id
// @access  Private
router.get('/:id', passportJWT, async (req, res) => {
  const errors = {};
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      errors.noquote = 'No quote found';
      return res.status(400).json(errors);
    }
    if (req.user.id !== quote.user._id.toString())
    {
      errors.noquote = 'Not Authorized';
      return res.status(400).json(errors);
    }
    await quote.remove();
    return res.json({success: 'true'});
  } catch (err) {
    errors.noquote = "No quote found or not authorized"
    return res.status(400).json({errors})
  }
});


// @route   POST api/quotes/like/:id
// @desc    Like quote by id
// @access  Private
router.post('/like/:id', passportJWT, async (req, res) => {
  const errors = {};
  try{
    let quote = await Quote.findById(req.params.id);
    if (!quote) {
      errors.noquote = `No quote found`;
      return res.status(404).json(errors);
    }
    if (quote.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      errors.alreadyLiked = 'User already liked this quote';
      return res.status(400).json(errors);
    }

    // Add user id to likes array
    quote.likes = [{ user: req.user.id }].concat(quote.likes);

    // Save the quote
    quote = await quote.save();

    return res.json(quote);
  }catch(err){
    errors.noquote = await `No quote found`;
    return res.status(404).json(errors);
  }
});

// @route   POST api/quotes/like/:id
// @desc    Unlike quote by id
// @access  Private
router.post('/unlike/:id', passportJWT, async (req, res) => {
  const errors = {};
  try{
    let quote = await Quote.findById(req.params.id);
    if (!quote) {
      errors.noquote = `No quote found`;
      return res.status(404).json(errors);
    }
    if (quote.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      errors.alreadyLiked = 'You have not liked the post yet';
      return res.status(400).json(errors);
    }

    // Add user id to likes array
    const updateLikes = quote.likes.filter(like => like.user.toString() !== req.user.id);
    quote.likes = updateLikes;

    // Save the quote
    quote = await quote.save();

    return res.json(quote);
  }catch(err){
    errors.noquote = await `No quote found`;
    return res.status(404).json(errors);
  }
});


/**Router Middleware */
module.exports = router;