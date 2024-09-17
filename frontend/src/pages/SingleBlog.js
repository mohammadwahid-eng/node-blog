import React from 'react'

export default function SingleBlog() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Single Blog Post Title</h1>
        <p className="text-gray-600 mb-6">Published on September 17, 2024</p>
        <div className="prose prose-lg max-w-none mb-8">
          <p>This is the content of the blog post. It can be styled with Tailwind's built-in typography classes.</p>
          <p>More paragraphs, images, and other content can go here...</p>
        </div>
      </div>
    </div>
  )
}
