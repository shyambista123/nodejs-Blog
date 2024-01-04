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
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, password: hashedPassword });
    req.session.user = { id: user.id, username: user.username };
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.redirect('/register');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = { id: user.id, username: user.username };
      res.redirect('/blogs');
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
