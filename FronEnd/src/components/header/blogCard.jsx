import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  const samplePost = {
    id: 1,
    title: 'What is Lorem Ipsum?',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    creation_date: '2024-04-26T16:06:12.170152Z',
    category: { id: 1, name: 'Sport' },
    tags: [
      { id: 1, name: 'Sport Person' },
      { id: 2, name: 'News' }
    ]
  };

  const currentPost = post || samplePost;

  return (
    <div className="bg-white rounded-lg max-w-md overflow-hidden shadow-lg">
      <img className="w-full h-64 object-cover" src="https://via.placeholder.com/800x400" alt={currentPost.title} />
      <div className="p-6">
        <div className="mb-4">
          <span className="text-sm text-gray-600">{currentPost.creation_date}</span>
          <span className="text-sm text-gray-600 ml-2">Category: {currentPost.category.name}</span>
        </div>
        <h2 className="text-xl font-bold mb-2">{currentPost.title}</h2>
        <p className="text-gray-700 mb-4">{currentPost.content.slice(0, 150)}...</p>
        <div className="flex justify-between items-center">
          <Link to={`/blog/${currentPost.id}`} className="text-blue-500 hover:text-blue-700">Read more</Link>
          <div>
            {currentPost.tags.map(tag => (
              <span key={tag.id} className="inline-block bg-gray-200 text-sm text-gray-700 px-2 py-1 rounded-full mr-1">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
