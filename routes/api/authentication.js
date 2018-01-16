const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/user.js');

const router = express.Router();

mongoose.Promise = global.Promise;

// GET to /checksession
router.get('/checksession', (req, res) => {
  if (req.user) {
    return res.send(JSON.stringify(req.user));
  }
  return res.send(JSON.stringify({}));
});

// GET to  /logout
router.get('/logout', (req, res) => {
  req.logout();
  return res.send(JSON.stringify(req.user));
});

// POST to /register
router.post('/register', (req, res) => {
    // Create a User object to save, usign values from incoming JSON
  const newUser = new User(req.body);

    // Save, via PAssport's "register" method, the user
  User.register(newUser, req.body.password, (err) => {
        // If there is a problem send back a JOSN object with a error.
    if (err) {
      return res.send(JSON.stringify({ error: err }));
    }
    // Otherwise log them in
    return passport.authenticate('local')(req, res, () =>{
      //if logged in, we should have info send back
      if(req.user){
        return res.send(JSON.stringify(req.user));
      }
      // Otherwwise return an error
      return res.send(JSON.stringify({ error: 'There was and error loggin in' }));
    });
  });
});

// POST to /login
router.post('/login', async (req, res) => {
  // Look uo the user by their email
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();

  // If the usr exist, they'll have a username, so add them to the body
  if (foundUser) { req.body.username = foundUser.username; }

  passport.authenticate('local')(req, res, () => {
        // If logged in, we should have a user info to send back
    if (req.user) {
      return res.send(JSON.stringify(req.user));
    }

        // Otherwise return a error
    return res.send(JSON.stringify({ error: 'There was an error logging in.' }));
  });
});

module.exports = router;
