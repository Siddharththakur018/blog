const express = require('express');
const router = express.Router();
const {addComment, getCommentsByPost} = require('../controller/commentController');
const {protect} = require('../middleware/authMiddleware')

router.post('/addComment',protect, addComment);
router.get('/post/:postId', getCommentsByPost);

module.exports = router;