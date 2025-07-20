import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function PublishButton({ title, content, status = 'Published', isEditing = false, blogId }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const publishPost = async () => {
    if (!title || !content) {
      toast.error('Title and content are required!');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        content,
        status,
        isPremium: false,
      };

      let response;

      if (isEditing && blogId) {
        // Updating an existing blog
        response = await axios.patch(
          `${import.meta.env.VITE_SITE_URL}/api/post/updatepost/${blogId}`,
          payload,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        // Creating a new blog
        response = await axios.post(
          '${import.meta.env.VITE_SITE_URL}/api/post/createpost',
          payload,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      toast.success(response.data.message || (isEditing ? 'Post updated!' : 'Post published!'));
      setTimeout(() => {
        navigate('/blog-view');
      }, 2000);
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <Toaster position="top-right" reverseOrder={false} />
      <button
        onClick={publishPost}
        disabled={loading}
        className={`px-6 py-2 rounded-lg text-white transition duration-300 ${
          loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? (isEditing ? 'Updating...' : 'Publishing...') : (isEditing ? 'Update Blog' : 'Publish Blog')}
      </button>
    </div>
  );
}

export default PublishButton;
