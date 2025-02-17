import api from "../api";

// Fetch comments for a post
export const getComments = async (postId: string) => {
  try {
    const response = await api.get(`/posts/${postId}/comments/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

// Create a comment
export const createComment = async (postId: string, content: string) => {
  try {
    const response = await api.post(`/posts/${postId}/comments/`, { content });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId: string) => {
  try {
    await api.delete(`/posts/comments/${commentId}/`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
