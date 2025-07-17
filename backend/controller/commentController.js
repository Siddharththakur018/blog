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

        // Create and save the comment
        const comment = new Comment({
            author: req.user._id,
            content,
            post: postId
        });

        await comment.save();

        // Populate author with _id and username
        await comment.populate('author', '_id username');

        // Send structured response
        return res.status(201).json({
            _id: comment._id,
            content: comment.content,
            post: comment.post,
            author: {
                _id: comment.author._id,
                username: comment.author.username
            },
            createdAt: comment.createdAt
        });
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
            .populate('author', '_id username')
            .sort({ createdAt: -1 });

        return res.status(200).json(comments);
    } catch (error) {
        console.error("❌ Error fetching comments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Delete a comment (only post owner can delete)
const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        const post = await Post.findById(comment.post);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Only the post owner can delete the comment
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Forbidden. Only the post owner can delete comments." });
        }

        await comment.deleteOne();
        return res.status(200).json({ message: "Comment deleted successfully." });

    } catch (error) {
        console.error("❌ Error deleting comment:", error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addComment,
    getCommentsByPost,
    deleteComment
};
