const Post = require('../model/postModel');
const Comment = require('../model/commentModel');

// ✅ Add a comment (only for logged-in users)
const addComment = async (req, res) => {
    const { content, postId } = req.body;

    // Check if user is logged in
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized. Please log in to comment." });
    }

    // Validate required fields
    if (!content || !postId) {
        return res.status(400).json({ message: "Post ID and comment content are required." });
    }

    try {
        // Ensure the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Create the comment
        const comment = await Comment.create({
            author: req.user._id,
            content,
            post: postId
        });

        // Populate author with _id and username
        const populatedComment = await comment.populate('author', '_id username');

        return res.status(201).json(populatedComment);
    } catch (error) {
        console.error("❌ Error creating comment:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Get all comments for a post
const getCommentsByPost = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ post: postId })
            .populate('author', '_id username') // Include ID + username
            .sort({ createdAt: -1 });

        return res.status(200).json(comments);
    } catch (error) {
        console.error("❌ Error fetching comments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addComment, getCommentsByPost };
