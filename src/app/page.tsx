'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchDataDelete,
  fetchDataGet,
  fetchDataPatch,
} from './lib/fetchData';
import endpoints from './lib/endpoints';
import CreatePost from './components/CreatePost';
import Post from './components/Post';

import { Toaster } from 'react-hot-toast';
import { showError, showSuccess } from './utils/toast';
import Loading from './components/Loading';

export default function PostsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchDataGet(endpoints.posts),
  });

  const updatePost = useMutation({
    mutationFn: (updated: { id: number; data: any }) =>
      fetchDataPatch(endpoints.postById(updated.id), updated.data),
    onSuccess: () => {
      showSuccess('Post updated!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => showError('Failed to update post'),
  });

  const deletePost = useMutation({
    mutationFn: (id: number) => fetchDataDelete(endpoints.postById(id)),
    onSuccess: () => {
      showSuccess('Post deleted!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => showError('Failed to delete post'),
  });

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <CreatePost />
      <ul>
        {data?.slice(0, 5).map((post: any) => (
          <div key={post.id} className="mb-4 border-b pb-4">
            <Post post={post} />
            <div className="mt-2 space-x-2">
              <button
                className="bg-yellow-500 text-white p-1 rounded"
                onClick={() =>
                  updatePost.mutate({
                    id: post.id,
                    data: { title: 'Updated Title' },
                  })
                }
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => deletePost.mutate(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
