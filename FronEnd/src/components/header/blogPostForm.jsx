import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPostForm = ({ initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {});
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (e) => {
    const { options } = e.target;
    const selectedTags = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setFormData({ ...formData, tags: selectedTags });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/blog/blogs/add/', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Blog post submitted successfully:', response.data);
      // Optionally, you can reset form data after successful submission
      setFormData({});
    } catch (error) {
      console.error('Error submitting blog post:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Create/Update Post</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Tags Selection (Multiple) */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">
            Tags
          </label>
          <select
            id="tags"
            name="tags"
            value={formData.tags || []}
            onChange={handleTagsChange}
            multiple // Enable multiple selection
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogPostForm;
