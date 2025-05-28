const pool = require('../config/db');

exports.addReview = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const exists = await pool.query('SELECT * FROM reviews WHERE user_id = $1 AND book_id = $2', [userId, id]);
    if (exists.rows.length > 0) return res.status(400).json({ message: 'Already reviewed' });

    const result = await pool.query('INSERT INTO reviews (user_id, book_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *', [userId, id, rating, comment]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const result = await pool.query('UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 AND user_id = $4 RETURNING *', [rating, comment, id, userId]);
    if (result.rows.length === 0) return res.status(403).json({ message: 'Not authorized' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    if (result.rows.length === 0) return res.status(403).json({ message: 'Not authorized' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};