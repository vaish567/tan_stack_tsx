const baseURL = "https://jsonplaceholder.typicode.com";

const endpoints = {
  posts: `${baseURL}/posts`,
  postById: (id: number) => `${baseURL}/posts/${id}`,
  commentsByPost: (id: number) => `${baseURL}/posts/${id}/comments`,
  commentsByQuery: (postId: number) => `${baseURL}/comments?postId=${postId}`,
  comments: `${baseURL}/comments`,
  albums: `${baseURL}/albums`,
  photos: `${baseURL}/photos`,
};

export default endpoints;
