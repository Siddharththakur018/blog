import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle, ArrowSquareIn, ArrowSquareOut, Eye, Trash, PencilLine } from 'phosphor-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function BlogTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  const blogData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post/getpostbyuserid", {
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
      await axios.post(`http://localhost:3000/api/post/${id}/status`, {
        status: newStatus,
      }, {
        withCredentials: true,
      });
      blogData();
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  const updateBlog = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/post/updatepost/${id}`, {}, {
        withCredentials: true
      });
      blogData();
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/post/deletepost/${id}`, {
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
    <div className='w-[1000px] mx-auto min-h-[700px]'>
      <h2 className='text-center m-8 text-4xl font-bold'>Blogs</h2>

      {/* Search and Create Blog on same line */}
      <div className='flex justify-between items-center mb-5'>
        <input
          type="text"
          placeholder="Search blogs..."
          className="px-3 py-1 border rounded w-[250px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link to='/create-blog'>
          <button className='cursor-pointer border px-4 py-2 rounded-md bg-black text-white hover:bg-white hover:text-black transition duration-300'>
            Create Blog
          </button>
        </Link>
      </div>

      {/* Status Filter Buttons */}
      <div className="flex gap-4 mb-6 ">
        {['All', 'Published', 'Draft'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-1 cursor-pointer rounded border font-semibold ${statusFilter === status ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      {filteredData.length === 0 ? (
        <div className="text-center text-gray-500 my-20">
          <p className="text-lg">You haven’t written any blogs yet or nothing matches your filter.</p>
          <Link to='/create-blog'>
            <button className='cursor-pointer mt-4 border px-4 py-2 rounded-md bg-black text-white hover:bg-white hover:text-black transition duration-300'>
              Create Your First Blog
            </button>
          </Link>
        </div>
      ) : (
        filteredData.map((blog, index) => (
          <div to={`/view-blog/${blog._id}`} key={index} className='block'>
            <div className='shadow-md rounded-md p-4 mb-4 hover:bg-gray-50 transition'>
              <div className='flex justify-between items-center'>
                {/* Avatar and Info */}
                <div className='flex items-center'>
                  <div className='mr-6 border p-2 w-14 text-center bg-gray-300 border-gray-400 rounded-md'>
                    <p className='text-lg font-bold'>
                      {stripHtml(blog.title)?.charAt(0).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className='font-bold text-lg'>
                      {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
                    </p>
                    <p className='text-gray-600 text-sm'>
                      {stripHtml(blog.content).slice(0, 100)}...
                    </p>
                    <div className='flex gap-2 mt-1 text-sm'>
                      <p className={blog.status === 'Draft' ? 'text-orange-500 font-bold' : 'text-black font-bold'}>
                        {blog.status}
                      </p>
                      <p className="text-gray-500">• {dayjs(blog.createdAt).fromNow()}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex items-center gap-3'>
                  <PencilLine
                    size={20}
                    color="#060505"
                    weight="fill"
                    className='cursor-pointer'
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.confirm("Are you sure you want to update this blog")) {
                        navigate('/create-blog', { state: { blog } });
                      }
                    }}
                  />
                  <Trash
                    className='cursor-pointer'
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.confirm("Are you sure you want to delete this blog?")) {
                        deleteBlog(blog._id);
                      }
                    }}
                    size={20}
                    color="#ff0f0f"
                    weight="fill"
                  />
                  <Link to={`/view-blog/${blog._id}`}>
                    <Eye size={20} color="#050505" weight="fill" />
                  </Link>
                  <div className='relative group'>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleStatus(blog._id, blog.status);
                      }}
                      className='transition-transform duration-300'
                    >
                      {blog.status === 'Draft' ? (
                        <ArrowSquareIn className='cursor-pointer' size={20} color="#050505" weight="fill" />
                      ) : (
                        <ArrowSquareOut className='cursor-pointer' size={20} color="#050505" weight="fill" />
                      )}
                    </button>
                    <div className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'>
                      {blog.status === 'Published' ? 'Draft' : 'Publish'}
                    </div>
                  </div>
                  <p>{blog.author.name}</p>
                  <UserCircle size={32} color="#050505" weight="fill" />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogTable;
