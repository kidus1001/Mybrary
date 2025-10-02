const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const pool = require('../config/db');

// Get authors list
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM "Author"');
        const authors = result.rows;
    } catch {
        res.redirect('/');
    }
   res.render('authors/index');
});

// Add author route
router.get ('/new', (req, res) => {
   res.render('authors/new');
});

// Create author route
router.post('/', async (req, res) => {
  try {
    const newAuthor = await Author.addAuthor({ name: req.body.name });
    res.redirect('/authors'); // don’t forget the leading slash
  } catch (err) {
    console.error(err);
    res.render('authors/new', { errorMessage: 'Error creating author' });
  }
});

module.exports = router;