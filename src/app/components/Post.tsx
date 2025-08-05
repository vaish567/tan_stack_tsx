import React from 'react';

interface PostProps {
  post: {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => (
  <li className="mb-4">
    <h2 className="font-semibold">{post.title}</h2>
    <p>{post.body}</p>
  </li>
);

export default Post;