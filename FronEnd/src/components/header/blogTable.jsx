import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    tags: [], // Initialize as an array for multiple selection
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoriesResponse = await axios.get('http://127.0.0.1:8000/api/blog/categories/');
        setCategories(categoriesResponse.data);

        const tagsResponse = await axios.get('http://127.0.0.1:8000/api/blog/tags/');
        setTags(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching categories and tags:', error);
      }
    };

    fetchCategoriesAndTags();
  }, []);

  useEffect(() => {
    fetchBlogs();
}, [token]);

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



  const handleEdit = (blogId) => {
    const selectedBlog = blogs.find(blog => blog.id === blogId);
    setEditBlogId(blogId);
    setEditFormData({
      title: selectedBlog.title,
      content: selectedBlog.content,
      author: selectedBlog.author.id,
      category: selectedBlog.category.id,
      tags: selectedBlog.tags.map(tag => tag.id), // Initialize with existing tag IDs
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (blogId) => {
    setDeleteBlogId(blogId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/blog/blogs/delete/${deleteBlogId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
   await fetchBlogs()
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      // Handle multiple tag selection
      const selectedTags = Array.from(e.target.selectedOptions, option => option.value);
      setEditFormData({
        ...editFormData,
        [name]: selectedTags,
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/blog/blogs/update/${editBlogId}/`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await fetchBlogs()
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating blog:', error);
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
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{blog.title}</td>
                <td className="border px-4 py-2">{blog.content}</td>
                <td className="border px-4 py-2">{blog.author.name}</td>
                <td className="border px-4 py-2">{new Date(blog.creation_date).toLocaleString()}</td>
                <td className="border px-4 py-2">{blog.category.name}</td>
                <td className="border px-4 py-2">
                  {blog.tags.map(tag => (
                    <span key={tag.id} className="text-sm text-gray-700 px-2 py-1 rounded-full mr-1 mb-1">
                      {tag.name}
                    </span>
                  ))}
                </td>
                <td className="border px-4 py-2">
                  <button className="text-blue-600 hover:underline mr-2" onClick={() => handleEdit(blog.id)}>
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline" onClick={() => handleDelete(blog.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Delete Confirmation Modal"
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this blog?</p>
        <button onClick={confirmDelete}>Delete</button>
        <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Blog Modal"
      >
        <h2>Edit Blog</h2>
        <form onSubmit={handleEditFormSubmit}>
          <div>
            <label>Title:</label>
            <input type="text" name="title" value={editFormData.title} onChange={handleEditFormChange} />
          </div>
          <div>
            <label>Content:</label>
            <textarea name="content" value={editFormData.content} onChange={handleEditFormChange} />
          </div>
          <div>
            <label>Category:</label>
            <select name="category" value={editFormData.category} onChange={handleEditFormChange}>
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Tags:</label>
            <select
              name="tags"
              value={editFormData.tags}
              onChange={handleEditFormChange}
              multiple // Enable multiple selection
            >
              {tags.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </Modal>
    </div>
  );
};

export default BlogTable;
