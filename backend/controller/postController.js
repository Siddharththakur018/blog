const slugify = require('slugify');
const Post = require('../model/postModel');
const Comment = require('../model/commentModel')

const createPost = async (req, res) => {
  try {
    const { title, content, status,isPremium } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and Content both required!' });
    }

    let slug = slugify(title, { lower: true, strict: true });
    let slugExists = await Post.findOne({ slug });
    let suffix = 1;

    while (slugExists) {
      slug = slugify(title, { lower: true, strict: true }) + '-' + suffix;
      slugExists = await Post.findOne({ slug });
      suffix++;
    }

    const newPost = new Post({
      title,
      content,
      author: req.user.id,
      slug,
      status: status || 'Draft',
      isPremium: isPremium !== undefined ? isPremium : true,
    });

    await newPost.save();

    const populatedPost = await Post.findById(newPost._id).populate('author', 'name email');

    res.status(201).json({
      message: 'Post Created',
      post: populatedPost,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const userRole = req.user.role;
    const isPremiumUser = userRole === 'premium';

    // Get pagination query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    // Total count
    const totalPosts = await Post.countDocuments();

    // Fetch paginated posts
    const posts = await Post.find()
      .sort({ createdAt: -1 }) // optional: newest first
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email')
      .populate('comments');

    // 24hr premium lock logic
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const modifiedPosts = posts.map(post => {
      const locked =
        post.isPremium &&
        !isPremiumUser &&
        post.publishedAt > twentyFourHoursAgo;

      return {
        ...post._doc,
        locked,
      };
    });

    res.status(200).json({
      message: "Posts fetched successfully",
      posts: modifiedPosts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        hasNextPage: page * limit < totalPosts,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



const getPostById = async(req,res) => {
  try {
    const {id} = req.params;
    const posts = await Post.findById(id).populate('author', 'name email').populate('comments');
    res.status(200).json({message: "Posts fetched", posts})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

const getPostByUserId = async (req, res) => {
  try {
    const userId = req.user._id; // comes from token via `protect` middleware
    const posts = await Post.find({ author: userId })
      .populate('author', 'name email')
      .populate('comments');

    res.status(200).json({ message: 'Posts fetched', posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const updatePost = async(req,res) => {
  try {
    const {id} = req.params;
    const updatedData = req.body;
    const posts = await Post.findByIdAndUpdate(id,updatedData,{new: true}).populate('author','name email');
    if(!posts){
      return res.status(401).json({message: "Post Not Found!"});
    }

    return res.status(200).json({message: "Post Updated", posts})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

const deletePost = async(req,res) => {
  try {
    const {id} = req.params;
    const posts = await Post.findByIdAndDelete(id)
    if(!posts){
      return res.status(404).json({message: "Post Not Found!"});
    }

    return res.status(200).json({message: "Post deleted successfuly!"})
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}


const postStatus = async(req,res) => {
  try {
    const {id} = req.params;
    const {status} = req.body;

    const validStatus = ['Published', 'Draft'];
    if(!validStatus.includes(status)){
      res.status(400).json({message: "Status selected is wrong"});
    }

  const post = await Post.findById(id);
  if(!post){
    res.status(404).json({message: "Post not found!"});
  }

  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  post.status = status;
  await post.save();

  const updatedStatus = await Post.findById(id).populate('author', 'name email');
  return res.status(200).json({message: "Post Updated sucessully", post: updatedStatus})

  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

module.exports = { createPost,getAllPosts,getPostById,getPostByUserId,updatePost, deletePost, postStatus};
