import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/blogs/');
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (blogs.length === 0) {
    return <p>No blogs available</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <Link to={`/blog/details/${blog.id}`} >
            <div key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
                <div className="mb-4">
                <span className="text-sm text-gray-600">{formatDate(blog.creation_date)}</span>
                <span className="text-sm text-gray-600 ml-2">Category: {blog.category.name}</span>
                </div>
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.content.slice(0, 150)}...</p>
                <div className="flex justify-between items-center">
                <Link to={`/blog/details/${blog.id}`} className="text-blue-500 hover:text-blue-700">Read more</Link>
                <div>
                    {blog.tags.map(tag => (
                    <span key={tag.id} className="inline-block bg-gray-200 text-sm text-gray-700 px-2 py-1 rounded-full mr-1">
                        {tag.name}
                    </span>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogCard;
