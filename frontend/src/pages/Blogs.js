import React from 'react'
import { Link } from 'react-router-dom'

export default function Blogs() {
  const posts = [
    { title: 'Post Title 1', excerpt: 'This is a short excerpt of the blog post...' },
    { title: 'Post Title 2', excerpt: 'This is another short excerpt...' },
    // Add more posts as needed
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <p className="text-gray-700">{post.excerpt}</p>
            <Link to={"/blogs/1"} className="text-blue-500 hover:underline mt-4 block">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
