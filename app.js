const express = require('express');
const session = require('express-session');
require('dotenv').config()
const { Sequelize } = require('sequelize');
const methodOverride = require('method-override');
const userRoutes = require('./routes/userRouters');
const blogRoutes = require('./routes/blogRouters');
const config = require('./config/config.js');
const flash = require('express-flash')

const sequelize = new Sequelize(config.production);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET_KEY || 'default_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(flash()); 

app.use(methodOverride('_method'));


const authenticateUser = (req, res, next) => {
  const user = req.session.user;
  res.locals.user = user;
  if (!user) {
    return res.redirect('/login');
  }
  next();
};


app.use('/', userRoutes);

app.use('/blogs', authenticateUser, blogRoutes);

app.use((req, res) => {
  res.status(404).render('404');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
