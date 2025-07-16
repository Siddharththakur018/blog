import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogBanner from './BlogBanner';
import { useNavigate } from 'react-router-dom';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/post/getallposts', {
          withCredentials: true,
        });
        setBlogs(response.data.posts);
      } catch (error) {
        console.error('Error fetching the blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const isLocked = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    return now - createdDate < 24 * 60 * 60 * 1000;
  };

  const stripHtml = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <BlogBanner />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          🌟 Explore Our Latest Blogs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentBlogs.map((blog) => {
            const locked = isLocked(blog.createdAt);
            const handleClick = () =>
              locked ? navigate('/subscribe') : navigate(`/view/${blog._id}`);

            return (
              <div
                key={blog._id}
                onClick={handleClick}
                className={`group relative cursor-pointer overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105 ${
                  locked ? 'opacity-70' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>

                <div className="relative z-20 p-5 h-full bg-white flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {blog.title}
                    </h3>

                    <div className="flex items-center text-sm text-gray-500 gap-2">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        {blog.author?.name?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <span>{blog.author?.name || 'Unknown Author'}</span>
                      <span className="mx-1 text-gray-400">•</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {stripHtml(blog.content).slice(0, 180) || 'No summary available.'}
                    </p>
                  </div>

                  <div className="mt-4 text-right">
                    <span
                      className={`text-sm font-medium transition ${
                        locked
                          ? 'text-gray-400'
                          : 'text-blue-600 hover:text-blue-800 underline'
                      }`}
                    >
                      {locked ? '🔒 Subscribe to Unlock' : 'Read More →'}
                    </span>
                  </div>
                </div>

                {locked && (
                  <div className="absolute inset-0 z-30 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                    <p className="text-sm text-gray-700 font-medium">Locked - Subscribe to Read</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {blogs.length > blogsPerPage && (
          <div className="mt-14 flex justify-center">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                ← Prev
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 text-sm rounded-full transition font-medium border ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Blogs;
