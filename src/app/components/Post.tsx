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
  <div>
    <h2 className="font-semibold text-[15px] mb-2">{post.title}</h2>
    <p className="text-gray-500 font-light text-[13px]">{post.body}</p>
  </div>
);

export default Post;
