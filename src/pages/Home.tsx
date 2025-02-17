import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, createPost, updatePost, deletePost } from "../services/postsServices";
import "../styles/homepage.css";
import Comments from "../components/Comments";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";





const Home = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<{ id: string; title: string; content: string }[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editingPost, setEditingPost] = useState<{ id: string; title: string; content: string } | null>(null);

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Handle form submission to create a new post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdPost = await createPost(newPost);
      setPosts([...posts, createdPost]);
      setNewPost({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Handle delete post
  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Handle update post
  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    try {
      const updatedPost = await updatePost(editingPost.id, { title: editingPost.title, content: editingPost.content });
      setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
      setEditingPost(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh");
    if (refreshToken) {
      const success = await logout(refreshToken);
      if (success) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Wordly</div>
        <ul className="nav-links">
          <li><Link to="/home" className="nav-link">Home</Link></li>
          <li><Link to="/explore" className="nav-link">Explore</Link></li>
          <li><Link to="/profile" className="nav-link">Profile</Link></li>
          <button className="nav-link login-btn" onClick={handleLogout}>Logout</button>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Share Your Thoughts with the World</h1>
          <p>Write, explore, and connect with like-minded people.</p>
          <a href="#main-content" className="cta-btn">Start Writing</a>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content" id="main-content"  >
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Trending Topics</h3>
          <ul className="trending-topics">
            <li>#Technology</li>
            <li>#Startups</li>
            <li>#Health</li>
            <li>#Lifestyle</li>
          </ul>
        </aside>

        {/* Main Feed */}
        <section className="feed">
          <h2>Recent Posts</h2>

          {/* Create Post Form */}
          <form className="post-form" onSubmit={handleCreatePost}>
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
            />
            <textarea
              placeholder="What's on your mind?"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              required
            ></textarea>
            <button type="submit">Create Post</button>
          </form>

          {/* Edit Post Form */}
          {editingPost && (
            <form className="edit-form" onSubmit={handleUpdatePost}>
              <input
                type="text"
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                required
              />
              <textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                required
              ></textarea>
              <button type="submit">Update Post</button>
              <button onClick={() => setEditingPost(null)}>Cancel</button>
            </form>
          )}

          {/* Display Posts */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div className="post-actions">
                  <button onClick={() => setEditingPost(post)}>Edit</button>
                  <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                </div>
                <Comments postId={post.id} />
              </div>
            ))
          ) : (
            <p>No posts yet. Be the first to write something!</p>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p> 2025 Wordly. Simon Maina.</p>
      </footer>
    </div>
  );
};

export default Home;
