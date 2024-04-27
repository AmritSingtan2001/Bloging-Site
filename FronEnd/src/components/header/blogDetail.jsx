import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const user = JSON.parse(sessionStorage.getItem('user')); 
  const token = sessionStorage.getItem('token');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/blog/blogs/${id}`);
      setBlog(response.data);
      const commentsResponse = await axios.get(`http://127.0.0.1:8000/api/blog/blogs/${id}/comments/`);
      setComments(commentsResponse.data);
      console.log(commentsResponse.data)
    } catch (error) {
      setError('Error fetching blog details');
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/blog/comments/create/`,
        {
          blog: id,
          content: newComment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      await fetchBlogDetails();
      setNewComment(''); 
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <span>{formatDate(blog.creation_date)}</span>
          <span className="mx-2">&bull;</span>
          <span>Category: {blog.category.name}</span>
        </div>
        <p className="text-gray-700">{blog.content}</p>
        <div className="mt-4">
          <p className="text-gray-600">Written by: {blog.author.email}</p>
          <div className="flex flex-wrap mt-2">
            {blog.tags.map(tag => (
              <span key={tag.id} className="inline-block bg-gray-200 text-sm text-gray-700 px-2 py-1 rounded-full mr-2 mb-2">
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              Post Comment
            </button>
          </form>

          <ul className="mt-4 space-y-4">
            {comments.map(comment => (
              <li key={comment.id} className="border border-gray-300 p-4 rounded-md">
                <p className="text-gray-700">{comment.content}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">Comment By: {comment.commentor.name}</span>
                  <span className="text-sm text-gray-500">{formatDate(comment.created_at)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
