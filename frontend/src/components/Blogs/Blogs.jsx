import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
  try {
    setError(null);
    const response = await axios.get('http://localhost:3000/api/post/getallposts', {
      withCredentials: true,
    });

    // 🛠️ Filter only published posts
    const publishedPosts = response.data.posts.filter(post => post.status === 'Published');

    const sortedPosts = publishedPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setPosts(sortedPosts);
  } catch (error) {
    setError('Failed to load blogs. Please try refreshing the page.');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePostClick = (id) => {
    const hoursSinceCreated = (new Date() - new Date(post.createdAt)) / 3600000;
    const isLocked = hoursSinceCreated < 24;
    if (isLocked) {
      navigate('/subscribe');
    } else {
      navigate(`/view-blog/${blog._id}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const stripHtml = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  const truncateContent = (content, maxLength = 200) => {
    const textContent = stripHtml(content);
    if (textContent.length <= maxLength) return textContent;
    return textContent.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-lg text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          Loading articles...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 px-4 text-red-500 text-base">
        <div className="text-5xl mb-5">⚠️</div>
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 px-4 text-gray-400">
        <div className="text-5xl mb-5">📝</div>
        <h3 className="text-2xl mb-2 text-gray-500">No articles yet</h3>
        <p>Be the first to share your thoughts!</p>
      </div>
    );
  }

  const [latestPost, ...restPosts] = posts;

  const renderPostCard = (post) => {
    const hoursSinceCreated = (new Date() - new Date(post.createdAt)) / 3600000;
    const isLocked = hoursSinceCreated < 24;

    return (
      <div
        key={post._id}
        onClick={() => handlePostClick(post)}
        className="cursor-pointer bg-white border rounded-xl shadow-sm p-5 transition hover:shadow-lg relative"
      >
        {isLocked && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 text-xs rounded font-semibold">
            🔒 Locked (24h)
          </div>
        )}
        <h3 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h3>
        <div className="text-sm text-gray-500 mb-3">
          By {post.author?.name || 'Unknown'} • {formatDate(post.createdAt)}
        </div>
        {isLocked ? (
          <div className="text-center bg-yellow-50 p-4 border border-yellow-300 rounded-md text-yellow-600 text-sm">
            Subscribe to unlock this article
          </div>
        ) : (
          <p className="text-gray-600 text-sm">{truncateContent(post.content)}</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-sans">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Latest Blog Posts</h1>
        <p className="text-lg text-gray-500">Fresh insights and stories delivered daily</p>
      </div>

      {/* Featured Latest Blog */}
      <div
        onClick={() => handlePostClick(latestPost)}
        className="mb-12 bg-gradient-to-r from-blue-100 to-white p-8 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition relative"
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-3">{latestPost.title}</h2>
        <div className="text-sm text-gray-600 mb-4">
          By {latestPost.author?.name || 'Unknown'} • {formatDate(latestPost.createdAt)}
        </div>
        <p className="text-gray-700 text-base">
          {truncateContent(latestPost.content, 300)}
        </p>
        <Link to='/subscribe' className="mt-4 block text-blue-600 font-medium">Read Full Article →</Link>
        {(new Date() - new Date(latestPost.createdAt)) / 3600000 < 24 && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 text-xs rounded font-semibold">
            🔒 Locked (24h)
          </div>
        )}
      </div>

      {/* Grid of Remaining Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {restPosts.map((post) => renderPostCard(post))}
      </div>
    </div>
  );
};

export default Blogs;
