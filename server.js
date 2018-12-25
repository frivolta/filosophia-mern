const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const app = express();



/** Require API Routes */
const users = require ('./routes/api/users');

/** Define Middlewares */
//Bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Passport
app.use(passport.initialize());

/** Require MongoDB Connection */
//DB Config
const db = require ('./config/keys').mongoURI;
//Connect to mongoDB
mongoose.connect(db)
    .then(()=>console.log('MongoDB Connected'))
    .catch((err)=>console.log(err));
    
/** Require Passport Middleware */

/** Define Routes */
app.use ('/api/users', users);


/** Start and Listen */
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log (`Server running on port ${port}`));
