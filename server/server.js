const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Helper function to read posts
const readPosts = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

// Helper function to write posts
const writePosts = (posts) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
};

// GET all posts
app.get('/api/posts', (req, res) => {
    const posts = readPosts();
    res.json(posts);
});

// GET single post
app.get('/api/posts/:id', (req, res) => {
    const posts = readPosts();
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// POST new post
app.post('/api/posts', (req, res) => {
    const posts = readPosts();
    const newPost = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content,
        category: req.body.category || 'General',
        imageUrl: req.body.imageUrl || '',
        date: new Date().toISOString()
    };
    posts.push(newPost);
    writePosts(posts);
    res.status(201).json(newPost);
});

// PUT update post
app.put('/api/posts/:id', (req, res) => {
    const posts = readPosts();
    const index = posts.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        posts[index] = { ...posts[index], ...req.body, id: req.params.id };
        writePosts(posts);
        res.json(posts[index]);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// DELETE post
app.delete('/api/posts/:id', (req, res) => {
    const posts = readPosts();
    const filteredPosts = posts.filter(p => p.id !== req.params.id);
    if (posts.length !== filteredPosts.length) {
        writePosts(filteredPosts);
        res.json({ message: 'Post deleted' });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
