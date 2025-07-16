import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

function CommentBlog({ postId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState(null);

  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/comment/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Unable to load comments. Please try again later.');
    }
  };

  const addComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        'http://localhost:3000/api/comment/addComment',
        {
          content: commentText,
          postId: postId,
        },
        {
          withCredentials: true,
        }
      );
      setComments(prev => [res.data, ...prev]);
      setCommentText('');
      setError(null);
    } catch (err) {
      console.error('Error adding comment:', err);
      setError(err.response?.data?.message || 'Failed to post comment.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white border border-gray-200 rounded-xl shadow-lg mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🗨️ Comments</h2>

      {/* Comment Input */}
      {isLoggedIn ? (
        <div className="flex items-start gap-4 mb-8">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              rows="3"
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            ></textarea>
            <div className="text-right mt-2">
              <button
                onClick={addComment}
                className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic mb-8">You must be logged in to post a comment.</p>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* Comments */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first!</p>
        ) : (
          <>
            {/* Show First 2 Comments */}
            {comments.slice(0, 2).map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}

            {/* Scrollable Container for Remaining */}
            {comments.length > 2 && (
              <div className="max-h-60 overflow-y-auto pr-1 space-y-5 custom-scrollbar">
                {comments.slice(2).map((comment) => (
                  <CommentCard key={comment._id} comment={comment} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CommentCard({ comment }) {
  const { author, createdAt, content } = comment;
  const username = author?.username || 'Anonymous';
  const avatarUrl = `https://ui-avatars.com/api/?name=${username}`;

  return (
    <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-700">{username}</span>
          <span className="text-xs text-gray-400 ml-2">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>
        <p className="mt-1 text-gray-800 text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

export default CommentBlog;
