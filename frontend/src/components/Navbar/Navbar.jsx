import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import Logo from '../../assets/logo.png'
import { useAuth } from '../../contexts/AuthContext';


function NavBar() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
      <nav className="navbar">
            <div className="navbar-logo">
              <Link to="/" className='logo-text'>
              <h1><img src={Logo} alt="logo" className="filmora-logo" />Filmora<span className='logo-x'>X</span></h1>
              </Link>  
            </div>

            <div className="navbar-links">
                <Link to="/" className="nav-link">
                    <span>Home</span>
                </Link>
                <Link to="/favorites" className="nav-link">
                    <span>Wishlist</span>
                </Link>

                {currentUser ? (
                    <div className="profile-section" ref={dropdownRef}>
                        <button 
                            className="profile-button" 
                            onClick={toggleDropdown}
                            aria-expanded={showDropdown}
                        >
                            <div className="profile-avatar">
                                {currentUser.photoURL ? (
                                    <img 
                                        src={currentUser.photoURL} 
                                        alt="Profile" 
                                        className="avatar-image"
                                    />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {currentUser.username?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                )}
                            </div>
                            <div className="profile-info">
                                <span className="profile-name">{currentUser.username}</span>
                            </div>
                            <svg 
                                className={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`}
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2"
                            >
                                <polyline points="6,9 12,15 18,9"></polyline>
                            </svg>
                        </button>

                        {showDropdown && (
                            <div className="profile-dropdown">
                                <div className="dropdown-header">
                                    <div className="dropdown-avatar">
                                        {currentUser.photoURL ? (
                                            <img 
                                                src={currentUser.photoURL} 
                                                alt="Profile" 
                                                className="dropdown-avatar-image"
                                            />
                                        ) : (
                                            <div className="dropdown-avatar-placeholder">
                                                {currentUser.username?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <div className="dropdown-user-info">
                                        <div className="dropdown-username">{currentUser.username}</div>
                                        <div className="dropdown-email">{currentUser.email}</div>
                                    </div>
                                </div>
                                
                                <div className="dropdown-divider"></div>
                                
                                <Link 
                                    to="/profile" 
                                    className="dropdown-item"
                                    onClick={() => setShowDropdown(false)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    <span>View Profile</span>
                                </Link>
                                
                                <Link 
                                    to="/settings" 
                                    className="dropdown-item"
                                    onClick={() => setShowDropdown(false)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="3"></circle>
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                    </svg>
                                    <span>Settings</span>
                                </Link>
                                
                                <div className="dropdown-divider"></div>
                                
                                <button 
                                    className="dropdown-item logout-item" 
                                    onClick={handleLogout}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16,17 21,12 16,7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    <span>Sign out</span>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (

                    <div className="auth-buttons">
                        <Link to="/login" className="nav-link login-link">
                            <span>Sign In</span>
                        </Link>
                        <Link to="/register" className="nav-link register-link">
                            <span>SignUp for free</span>
                        </Link>
                    </div>
                )}
            </div>
      </nav>
  )
}

export default NavBar