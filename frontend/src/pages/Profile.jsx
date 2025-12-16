import React, { useState } from 'react';
import './Profile.css';

const ProfilePage = () => {
  const [user, setUser] = useState({
    username: 'johndoe',
    email: 'john.doe@example.com',
    photoURL: null,
    bio: 'Software developer passionate about React and UI/UX',
    location: 'San Francisco, CA',
    joinedDate: 'January 2024',
    website: 'https://johndoe.com'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    website: user.website
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditForm({
        username: user.username,
        bio: user.bio,
        location: user.location,
        website: user.website
      });
    }
  };

  const handleSave = () => {
    setUser({ ...user, ...editForm });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-large">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="avatar-image-large" />
            ) : (
              user.username?.charAt(0).toUpperCase()
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-top">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleInputChange}
                  className="profile-username-input"
                />
              ) : (
                <h1 className="profile-username">{user.username}</h1>
              )}
              <p className="profile-email">{user.email}</p>
            </div>
            <div className="profile-buttons">
              <button
                onClick={isEditing ? handleSave : handleEditToggle}
                className={`profile-btn ${isEditing ? 'btn-save' : 'btn-edit'}`}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
              {isEditing && (
                <button onClick={handleEditToggle} className="profile-btn btn-cancel">
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className="profile-info-grid">
            <div className="profile-field">
              <label className="profile-label">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className="profile-textarea"
                />
              ) : (
                <p className="profile-text">{user.bio}</p>
              )}
            </div>

            <div className="profile-field">
              <label className="profile-label">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              ) : (
                <p className="profile-text">{user.location}</p>
              )}
            </div>

            <div className="profile-field">
              <label className="profile-label">Website</label>
              {isEditing ? (
                <input
                  type="url"
                  name="website"
                  value={editForm.website}
                  onChange={handleInputChange}
                  className="profile-input"
                />
              ) : (
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="profile-link">
                  {user.website}
                </a>
              )}
            </div>

            <div className="profile-field">
              <label className="profile-label">Member Since</label>
              <p className="profile-text">{user.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;