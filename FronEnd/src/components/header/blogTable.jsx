import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/blog/user/blog', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [token]);

  const handleEdit = (blogId) => {
    // Redirect to edit page or implement edit logic
    console.log(`Editing blog with ID: ${blogId}`);
  };

  const handleDelete = async (blogId) => {
    // Implement delete logic
    try {
      await axios.delete(`http://127.0.0.1:8000/api/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Update blogs state after successful deletion
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
      console.log(`Deleted blog with ID: ${blogId}`);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className="container-fluid px-4">
      <h2 className="text-center text-2xl font-bold my-4">Blog Posts</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">SN</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Creation Date</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Tags</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {blogs.map((blog, index) => (
                <tr key={blog.id}>
                <td className="border px-4 py-2">{index + 1}</td> {/* Adding index + 1 */}
                <td className="border px-4 py-2">{blog.title}</td>
                <td className="border px-4 py-2">{blog.content}</td>
                <td className="border px-4 py-2">{blog.author.name}</td>
                <td className="border px-4 py-2">{new Date(blog.creation_date).toLocaleString()}</td>
                <td className="border px-4 py-2">{blog.category.name}</td>
                <td className="border px-4 py-2">
                    <div className="flex flex-wrap">
                    {blog.tags.map(tag => (
                        <span key={tag.id} className=" text-sm text-gray-700 px-2 py-1 rounded-full mr-1 mb-1">
                        {tag.name},
                        </span>
                    ))}
                    </div>
                </td>
                <td className="border px-4 py-2">
                    <Link to={`/edit/${blog.id}`} className="text-blue-600 hover:underline mr-2" onClick={() => handleEdit(blog.id)}>
                    Edit
                    </Link>
                    <button className="text-red-600 hover:underline" onClick={() => handleDelete(blog.id)}>
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>

        </table>
      </div>
    </div>
  );
};

export default BlogTable;
