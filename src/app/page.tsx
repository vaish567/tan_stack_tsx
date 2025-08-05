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
import Pagination from './components/Pagination';
import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const POSTS_PER_PAGE = 10;

export default function PostsPage() {
  const [currentPage, setCurrentPage] = useState(1);
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

  // Pagination logic
  const totalPosts = data?.length || 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const paginatedPosts = data?.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      <CreatePost />

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {paginatedPosts?.map((post: any) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
          >
            <Post post={post} />
            <div className="mt-4 flex justify-between">
              <button
                className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full hover:bg-yellow-700 transition"
                onClick={() =>
                  updatePost.mutate({
                    id: post.id,
                    data: { title: 'Updated Title' },
                  })
                }
              >
                <FaEdit fontSize={12} />
              </button>
              <button
                className="bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition"
                onClick={() => deletePost.mutate(post.id)}
              >
                <MdDelete fontSize={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
