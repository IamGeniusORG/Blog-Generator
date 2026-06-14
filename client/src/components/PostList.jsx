import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        const results = posts.filter(post => {
            const title = post.title || '';
            const category = post.category || 'General';
            return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   category.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredPosts(results);
    }, [searchTerm, posts]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/posts');
            const data = await response.json();
            // Ensure every post has necessary fields for the UI
            const sanitizedData = data.map(post => ({
                ...post,
                category: post.category || 'General',
                imageUrl: post.imageUrl || '',
                content: post.content || ''
            }));
            setPosts(sanitizedData);
            setFilteredPosts(sanitizedData);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await fetch(`http://localhost:5000/api/posts/${id}`, {
                    method: 'DELETE',
                });
                setPosts(posts.filter(post => post.id !== id));
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const time = Math.ceil(words / wordsPerMinute);
        return `${time} min read`;
    };

    const getImageUrl = (url) => {
        if (!url) return null;
        // If it's a standard Unsplash photo page link, convert it to a direct image source
        const unsplashRegex = /unsplash\.com\/photos\/([a-zA-Z0-9_-]+)/;
        const match = url.match(unsplashRegex);
        if (match && match[1]) {
            return `https://images.unsplash.com/photo-${match[1]}?auto=format&fit=crop&w=1200&q=80`;
        }
        return url;
    };

    if (loading) return <div className="loading">Loading your feed...</div>;

    return (
        <div className="feed-container">
            <div className="feed-header">
                <h2>Latest Stories</h2>
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search by title or category..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            {filteredPosts.length === 0 ? (
                <div className="empty-state">
                    <p>No stories found matching your search.</p>
                </div>
            ) : (
                <div className="posts-grid">
                    {filteredPosts.map(post => (
                        <article key={post.id} className="vibrant-card">
                            <div className="card-image">
                                {post.imageUrl ? (
                                    <img 
                                        src={getImageUrl(post.imageUrl)} 
                                        alt={post.title} 
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div className="image-placeholder" style={{ display: post.imageUrl ? 'none' : 'flex' }}>
                                    {post.category[0]}
                                </div>
                                <span className="category-badge">{post.category}</span>
                            </div>
                            <div className="card-content">
                                <div className="card-meta">
                                    <span>{post.date ? new Date(post.date).toLocaleDateString() : 'No date'}</span>
                                    <span>•</span>
                                    <span>{calculateReadTime(post.content)}</span>
                                </div>
                                <h3>{post.title}</h3>
                                <p className="card-excerpt">
                                    {post.content && post.content.length > 120 ? post.content.substring(0, 120) + '...' : post.content}
                                </p>
                                <div className="card-footer">
                                    <div className="card-actions">
                                        <Link to={`/edit/${post.id}`} className="btn-icon" title="Edit">✏️</Link>
                                        <button onClick={() => handleDelete(post.id)} className="btn-icon btn-icon-danger" title="Delete">🗑️</button>
                                    </div>
                                    <Link to={`/edit/${post.id}`} className="read-more">Read More →</Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostList;
