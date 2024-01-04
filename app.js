const express = require('express');
const session = require('express-session');
require('dotenv').config()
const { Sequelize } = require('sequelize');
const methodOverride = require('method-override');
const userRoutes = require('./routes/userRouters');
const blogRoutes = require('./routes/blogRouters');


const sequelize = new Sequelize(process.env.DATABASE_PROD_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));


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

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
