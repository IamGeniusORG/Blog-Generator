import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ 
        title: '', 
        content: '', 
        category: 'General', 
        imageUrl: '' 
    });
    const isEditing = !!id;

    const categories = ['General', 'Technology', 'Lifestyle', 'Travel', 'Food', 'Business'];

    useEffect(() => {
        if (isEditing) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${id}`);
            const data = await response.json();
            setPost({ 
                title: data.title, 
                content: data.content,
                category: data.category || 'General',
                imageUrl: data.imageUrl || ''
            });
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing 
            ? `http://localhost:5000/api/posts/${id}` 
            : 'http://localhost:5000/api/posts';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post),
            });
            if (response.ok) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>{isEditing ? '⚡ Update Your Story' : '🚀 Create a New Story'}</h2>
                <p>Share your thoughts with the world in a vibrant way.</p>
            </div>

            <form onSubmit={handleSubmit} className="vibrant-form">
                <div className="form-group">
                    <label>Post Title</label>
                    <input 
                        type="text" 
                        value={post.title} 
                        onChange={(e) => setPost({ ...post, title: e.target.value })} 
                        placeholder="e.g., My Awesome Adventure"
                        required 
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Category</label>
                        <select 
                            value={post.category} 
                            onChange={(e) => setPost({ ...post, category: e.target.value })}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
                        <input 
                            type="text" 
                            value={post.imageUrl} 
                            onChange={(e) => setPost({ ...post, imageUrl: e.target.value })} 
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <textarea 
                        value={post.content} 
                        onChange={(e) => setPost({ ...post, content: e.target.value })} 
                        placeholder="Once upon a time..."
                        required 
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/')} className="btn btn-outline btn-large">Cancel</button>
                    <button type="submit" className="btn btn-primary btn-large">
                        {isEditing ? 'Save Changes' : 'Publish Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
