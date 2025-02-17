import api from "../api";

// Create a new post
export const createPost = async (postData: { title: string; content: string; image?: File }) => {
  try {
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    if (postData.image) {
      formData.append("image", postData.image);
    }

    const response = await api.post("/posts/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",  // Required for file uploads
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Get all posts
export const getPosts = async () => {
  try {
    const response = await api.get("/posts/");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Get a single post by ID
export const getPostById = async (postId: string) => {
  try {
    const response = await api.get(`/posts/${postId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

// Update a post by ID
export const updatePost = async (postId: string, updatedData: { title?: string; content?: string }) => {
  try {
    const response = await api.put(`/posts/${postId}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// Delete a post by ID
export const deletePost = async (postId: string) => {
  try {
    await api.delete(`/posts/${postId}/`);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
