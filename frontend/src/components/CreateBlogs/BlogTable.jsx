import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle, ArrowSquareIn, ArrowSquareOut, Eye, Trash, PencilLine } from 'phosphor-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Sidebar from './Sidebar';

dayjs.extend(relativeTime);

function BlogTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  const blogData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SITE_URL}/api/post/getpostbyuserid`, {
        withCredentials: true,
      });
      setData(response.data.posts);
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  useEffect(() => {
    blogData();
  }, []);

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    try {
      await axios.post(`${import.meta.env.VITE_SITE_URL}/api/post/${id}/status`, {
        status: newStatus,
      }, {
        withCredentials: true,
      });
      blogData();
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SITE_URL}/api/post/deletepost/${id}`, {
        withCredentials: true
      });
      blogData();
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  const filteredData = data.filter(blog =>
    (statusFilter === 'All' || blog.status === statusFilter) &&
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

      <div className="flex-1 w-full px-4 sm:px-6 lg:px-12 py-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Blogs</h2>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search blogs..."
            className="px-3 py-2 border rounded w-full sm:w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/create-blog">
            <button className="px-4 py-2 rounded bg-black text-white hover:bg-white hover:text-black border transition">
              Create Blog
            </button>
          </Link>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center text-gray-500 my-20">
            <p className="text-lg">You haven’t written any blogs yet or nothing matches your filter.</p>
            <Link to='/create-blog'>
              <button className='mt-4 px-4 py-2 rounded bg-black text-white hover:bg-white hover:text-black border transition'>
                Create Your First Blog
              </button>
            </Link>
          </div>
        ) : (
          filteredData.map((blog, index) => (
            <div key={index} className="w-full mb-4 bg-white shadow-md rounded-md p-4 hover:bg-gray-50 transition">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                  <div className="w-14 h-14 bg-gray-200 border border-gray-300 rounded-md flex items-center justify-center text-lg font-bold">
                    {stripHtml(blog.title)?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">
                      {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
                    </p>
                    <p className="text-gray-600 text-sm">{stripHtml(blog.content).slice(0, 100)}...</p>
                    <div className="flex gap-2 mt-1 text-sm flex-wrap">
                      <span className={blog.status === 'Draft' ? 'text-orange-500 font-semibold' : 'text-black font-semibold'}>
                        {blog.status}
                      </span>
                      <span className="text-gray-500">• {dayjs(blog.createdAt).fromNow()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <PencilLine
                    size={20}
                    color="#060505"
                    weight="fill"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.confirm("Are you sure you want to update this blog")) {
                        navigate('/create-blog', { state: { blog } });
                      }
                    }}
                  />
                  <Trash
                    size={20}
                    color="#ff0f0f"
                    weight="fill"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.confirm("Are you sure you want to delete this blog?")) {
                        deleteBlog(blog._id);
                      }
                    }}
                  />
                  <Link to={`/view-blog/${blog._id}`}>
                    <Eye size={20} color="#050505" weight="fill" />
                  </Link>
                  <div className="relative group">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleStatus(blog._id, blog.status);
                      }}
                    >
                      {blog.status === 'Draft' ? (
                        <ArrowSquareIn size={20} color="#050505" weight="fill" />
                      ) : (
                        <ArrowSquareOut size={20} color="#050505" weight="fill" />
                      )}
                    </button>
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      {blog.status === 'Published' ? 'Draft' : 'Publish'}
                    </div>
                  </div>
                  <p className="hidden sm:block">{blog.author.name}</p>
                  <UserCircle size={28} color="#050505" weight="fill" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BlogTable;
