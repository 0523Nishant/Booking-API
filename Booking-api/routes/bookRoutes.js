const express = require('express');
const router = express.Router();
const { addBook, getAllBooks, getBookById, searchBooks } = require('../controllers/bookController');
const { addReview } = require('../controllers/reviewController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/books', authenticateToken, addBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.get('/search', searchBooks);
router.post('/books/:id/reviews', authenticateToken, addReview);

module.exports = router;

