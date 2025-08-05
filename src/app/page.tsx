'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchDataGet } from './lib/fetchData';
import endpoints from './lib/endpoints';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import Loading from './components/Loading';


export default function PostsPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchDataGet(endpoints.posts),
  });

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <CreatePost />
      <ul>
        {data?.slice(0, 10).map((post: any) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
