
import React from 'react';

const BlogDetail = ({ post }) => {
  // Sample blog post object (replace with your actual post data)
  const samplePost = {
    id: 1,
    title: "What is Lorem Ipsum?",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    author: { id: 2, name: null, email: "singtanamrit154@gmail.com" },
    creation_date: "2024-04-26T16:06:12.170152Z",
    category: { id: 1, name: "Sport" },
    tags: [
      { id: 1, name: "Sport Person" },
      { id: 2, name: "News" }
    ]
  };

  const currentPost = post || samplePost;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{currentPost.title}</h1>
      <div className="flex items-center text-gray-600 mb-4">
        <span>{currentPost.creation_date}</span>
        <span className="mx-2">&bull;</span>
        <span>Category: {currentPost.category.name}</span>
      </div>
      <p className="text-gray-700">{currentPost.content}</p>
      <div className="mt-4">
        <p className="text-gray-600">Written by: {currentPost.author.email}</p>
        <div className="flex flex-wrap mt-2">
          {currentPost.tags.map(tag => (
            <span key={tag.id} className="inline-block bg-gray-200 text-sm text-gray-700 px-2 py-1 rounded-full mr-2 mb-2">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
