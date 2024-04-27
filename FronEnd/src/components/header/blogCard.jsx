import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6); 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/blogs/');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentBlogs.map(blog => (
          <Link key={blog.id} to={`/blog/details/${blog.id}`}>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
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
      <div className="mt-8 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastBlog >= blogs.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
