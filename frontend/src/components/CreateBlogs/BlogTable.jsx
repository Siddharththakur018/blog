import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle, ArrowSquareIn, ArrowSquareOut, Eye , Trash, PencilLine} from 'phosphor-react';

function BlogTable() {
  const [data, setData] = useState([]);
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

  const updateBlog = async(id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/post/updatepost/${id}`,
        {withCredentials: true}
      )
      blogData();
    } catch (error) {
      console.error("Error occured", error);
    }
  }

  const deleteBlog = async(id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/post/deletepost/${id}`,
        {withCredentials: true}
      )
      blogData();
    } catch (error) {
      console.error("Error occured", error);
    }
  }

  return (
    <div className='w-[1000px] mx-auto'>
      <h2 className='text-center m-8 text-4xl font-bold'>Blogs</h2>

      <Link to='/create-blog' className='flex justify-end mb-5'>
        <button className='cursor-pointer border p-2 rounded-md bg-black text-white hover:bg-white hover:text-black transition duration-300'>
          Create Blog
        </button>
      </Link>

      {data.map((blog, index) => (
        <div to={`/view-blog/${blog._id}`} key={index} className='block'>
          <div className='shadow-md rounded-md h-20 flex items-center p-4 mb-4 hover:bg-gray-50 transition'>
            {/* Avatar with first character */}
            <div className='mr-10 border p-2 w-14 text-center bg-gray-300 border-gray-400 rounded-md'>
              <p className='text-lg font-bold'>
                {stripHtml(blog.title)?.charAt(0).toUpperCase()}
              </p>
            </div>

            {/* Main blog info */}
            <div className='flex justify-between w-full items-center'>
              {/* Title and status */}
              <div>
                <p className='font-bold text-lg'>
                  {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
                </p>
                <div className='flex gap-2'>
                  <p className={blog.status === 'Draft' ? 'text-orange-500 font-bold' : 'text-black font-bold'}>
                    {blog.status}
                  </p>
                  <p>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>

              {/* Author + status toggle */}
              <div className='flex items-center gap-3'>
                <PencilLine size={20} color="#060505" weight="fill"  className='cursor-pointer' 
                  onClick={(e) => {
                  e.preventDefault();
                  if(window.confirm("Are you sure you want to update this blog")){
                    navigate('/create-blog', {state: {blog}});
                  }
                }}/>
                <Trash className='cursor-pointer' onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm("Are you sure you want to delete this blog?")) {
                    deleteBlog(blog._id);
                  }     
                }} size={20} color="#ff0f0f" weight="fill" />
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
                      <ArrowSquareOut className='cursor-pointer'  size={20} color="#050505" weight="fill" />
                    )}
                  </button>

                  {/* Tooltip */}
                  <div className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 '>
                    {blog.status === 'Published' ? 'Draft' : 'Published'}
                  </div>
                </div>
                  <p>{blog.author.name}</p>
                  <UserCircle size={32} color="#050505" weight="fill" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogTable;
