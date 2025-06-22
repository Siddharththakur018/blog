const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {createPost, getAllPosts,getPostById,getPostByUserId,updatePost,deletePost} = require('../controller/postController')

router.post('/createpost', protect, createPost);
router.get('/getallposts', protect, getAllPosts);
router.get('/getpostbyid/:id',protect,getPostById);
router.get('/getpostbyuserid',protect,getPostByUserId);
router.patch('/updatepost/:id',protect,updatePost);
router.delete('/deletepost/:id',protect,deletePost);

module.exports = router;