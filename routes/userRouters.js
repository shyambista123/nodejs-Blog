const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();
const saltRounds = 10;

router.get('/', async (req, res) => {
  const user = req.session.user;
  if (user) {
    res.redirect('/blogs');
  } else {
    res.redirect('/login');
  }
});

router.get('/register', (req, res) => {
  res.render('register', { message: req.flash('registerMessage') });
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      req.flash('registerMessage', 'User with this username already exists');
      res.redirect('/register');
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.create({ username, password: hashedPassword });

      req.flash('message', { type: 'success', text: 'Registered successfully! You can now log in.' });
      
      req.session.user = { id: user.id, username: user.username };
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/register');
  }
});


router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('message') });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = { id: user.id, username: user.username };
      res.redirect('/blogs');
    } else {
      req.flash('message', { type: 'error', text: 'Invalid username or password'});
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
