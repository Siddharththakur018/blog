import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';
import CommentBlog from './CommentBlog';

function BlogViews() {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const viewBlogs = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SITE_URL}//api/post/getpostbyid/${id}`,
                { withCredentials: true }
            );
            setBlog(response.data.posts);
        } catch (err) {
            console.error("Error occurred", err);
            setError("Failed to load blog post.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        viewBlogs();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-gray-500 text-lg animate-pulse">Loading blog...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-3xl mx-auto px-6 py-12">

                {/* Back Button */}
                <div className="mb-8">
                    <Link to='/blog' className="flex items-center text-gray-600 hover:text-black transition-colors duration-200">
                        <ArrowLeft size={24} weight="bold" className="mr-2" />
                        <span className="text-sm font-medium">Back to Blogs</span>
                    </Link>
                </div>

                {/* Featured Image (optional) */}
                {blog?.featuredImage && (
                    <img 
                        src={blog.featuredImage}
                        alt="Featured"
                        className="w-full h-64 object-cover rounded-lg mb-8 shadow"
                    />
                )}

                {/* Blog Title */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                    {blog?.title}
                </h1>

                {/* Author and Date */}
                <div className="text-sm text-gray-500 mb-6">
                    By {blog?.author?.name || 'Anonymous'} • {new Date(blog?.createdAt).toLocaleDateString()}
                </div>

                {/* Blog Content */}
                <div className="prose prose-lg prose-slate max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
                </div>
            </div>
                    <CommentBlog postId={id} />
        </div>
    );
}

export default BlogViews;
