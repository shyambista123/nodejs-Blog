const express = require('express');
const { Blog , User} = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: {
        model: User, 
        as: 'User',
      },
    });

    res.render('blogs', { blogs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/create', (req, res) => {
  res.render('createBlog');
});

router.post('/create', async (req, res) => {
  const { title, content } = req.body;
  const userId = req.session.user.id;

  if (!title || /^\s*$/.test(title) || !content || /^\s*$/.test(content)) {
    return res.send('Invalid title or content');
  }

  try {
    const blog = await Blog.create({ title, content, UserId: userId });
    res.redirect(`/blogs/`);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


const isBlogOwner = async (req, res, next) => {
  const blogId = req.params.id;
  const userId = req.session.user.id;

  try {
      const blog = await Blog.findByPk(blogId);

      if (!blog || blog.UserId !== userId) {
          return res.status(403).send('You are not authorized to delete this blog.');
      }

      next();
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};


router.get('/edit/:id', isBlogOwner, async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByPk(blogId);

    if (blog) {
      res.render('editBlog', { blog });
    } else {
      res.redirect('/blogs');
    }
  } catch (error) {
    console.error(error);
    res.redirect('/blogs');
  }
});

router.post('/edit/:id', isBlogOwner, async (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;

  if (!title || /^\s*$/.test(title) || !content || /^\s*$/.test(content)) {
    return res.send('Invalid title or content');
  }

  try {
    const blog = await Blog.findByPk(blogId);

    if (blog) {
      await blog.update({ title, content });
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


router.delete('/delete/:id', isBlogOwner, async (req, res) => {
  const blogId = req.params.id;

  try {
      await Blog.destroy({ where: { id: blogId } });
      res.redirect('/blogs');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
