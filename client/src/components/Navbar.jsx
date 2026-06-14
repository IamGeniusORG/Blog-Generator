import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Vibe<span>Blog</span>
                </Link>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/create" className="nav-link nav-link-btn">Create Post</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
