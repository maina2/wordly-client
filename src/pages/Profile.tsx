import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/userService";
import "../styles/profile.css";
import { Link } from "react-router-dom";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string;
  avatar: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ bio: "", avatar: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      setEditedProfile({ bio: data.bio, avatar: data.avatar });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProfile = await updateUserProfile(editedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <nav className="profile-nav">
        <Link to="/home" className="back-link">
          <svg
            className="back-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </nav>
      {/* rest of your profile page code */}
      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar-container">
            <img
              src={profile?.avatar || "/default-avatar.png"}
              alt="Profile"
              className="profile-avatar"
            />
            {isEditing && (
              <div className="avatar-overlay">
                <input
                  type="text"
                  name="avatar"
                  placeholder="New avatar URL"
                  value={editedProfile.avatar}
                  onChange={handleInputChange}
                  className="avatar-input"
                />
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{profile?.username}</h1>
            <p className="profile-email">{profile?.email}</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2 className="section-title">Bio</h2>
            {isEditing ? (
              <textarea
                name="bio"
                value={editedProfile.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                className="bio-textarea"
              />
            ) : (
              <p className="bio-text">{profile?.bio || "No bio yet"}</p>
            )}
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button onClick={handleSaveChanges} className="save-button">
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
