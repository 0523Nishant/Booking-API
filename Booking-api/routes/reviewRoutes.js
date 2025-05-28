const express = require('express');
const router = express.Router();
const { updateReview, deleteReview } = require('../controllers/reviewController');
const authenticateToken = require('../middleware/authMiddleware');

router.put('/reviews/:id', authenticateToken, updateReview);
router.delete('/reviews/:id', authenticateToken, deleteReview);

module.exports = router;
