import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import endpoints from '../lib/endpoints';
import { fetchDataPost } from '../lib/fetchData';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const queryClient = useQueryClient();

 const mutation = useMutation({
  mutationFn: async (newPost: { title: string; body: string }) => {
    return await fetchDataPost(endpoints.posts, newPost);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    setTitle('');
    setBody('');
  },
});


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, body });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        className="border p-2 mr-2"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        className="border p-2 mr-2"
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        {mutation.isPending ? 'Creating...' : 'Create Post'}
      </button>
      {mutation.isError && <p className="text-red-500">Error creating post</p>}
    </form>
  );
};

export default CreatePost;