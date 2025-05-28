const pool = require('../config/db');

exports.addBook = async (req, res) => {
  const { title, author, genre, description } = req.body;
  try {
    const result = await pool.query('INSERT INTO books (title, author, genre, description) VALUES ($1, $2, $3, $4) RETURNING *', [title, author, genre, description]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  let query = 'SELECT * FROM books';
  const params = [];
  if (author || genre) {
    query += ' WHERE';
    if (author) {
      params.push(`%${author}%`);
      query += ` author ILIKE $${params.length}`;
    }
    if (genre) {
      if (params.length > 0) query += ' AND';
      params.push(`%${genre}%`);
      query += ` genre ILIKE $${params.length}`;
    }
  }
  query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    const reviews = await pool.query('SELECT * FROM reviews WHERE book_id = $1', [id]);
    const avgRating = await pool.query('SELECT AVG(rating) FROM reviews WHERE book_id = $1', [id]);
    res.json({
      ...book.rows[0],
      averageRating: avgRating.rows[0].avg,
      reviews: reviews.rows
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  try {
    const result = await pool.query('SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1', [`%${q}%`]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
