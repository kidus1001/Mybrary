const pool = require('../config/db');

async function addAuthor(author) {
  const { name } = author;
  const result = await pool.query(
    `INSERT INTO "Author" (name) VALUES ($1) RETURNING *`,
    [name]
  );
  return result.rows[0];
}

module.exports = { addAuthor };
