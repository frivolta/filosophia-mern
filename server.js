const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const app = express();



/** Require API Routes */
const users = require ('./routes/api/users');
const quotes = require ('./routes/api/quotes');

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
app.use ('/api/quotes', quotes);


/** Serve static assets if in production*/
if(process.env.NODE_ENV === 'production'){
    //Set Static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

/** Start and Listen */
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log (`Server running on port ${port}`));
