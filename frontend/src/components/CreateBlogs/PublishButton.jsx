import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function PublishButton({ title, content, status = 'Published' }) {
  const [loading, setLoading] = useState(false);

  const publishPost = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:3000/api/post/createpost',
        {
          title,
          content,
          status,
          isPremium: false,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(response.data.message || 'Post published successfully!');
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error(error?.response?.data?.message || 'Error publishing post');
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
        {loading ? 'Publishing...' : 'Publish Blog'}
      </button>
    </div>
  );
}

export default PublishButton;
