const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const getData = require('./getData');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utility function to generate a new unique ID
const generateId = (blogs) => {
    if (blogs.length === 0) return 1;
    const ids = blogs.map(blog => parseInt(blog.id, 10));
    return Math.max(...ids) + 1;
};

// Function to write data (users and blogs) to JSON file
const writeData = (data) => {
    try {
        fs.writeFileSync('data/db.json', JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.error('Error writing data.json:', err);
    }
};

// Route to create a new blog
app.post('/blogs', (req, res) => {
    const data = getData();
    const newBlog = req.body;
    newBlog.id = generateId(data.blogs).toString(); // Convert to string to match existing ID format
    data.blogs.push(newBlog);
    writeData(data);
    res.status(201).json(newBlog);
});
// Route to create a new user
app.post('/users', (req, res) => {
    const data = getData();
    const newUser = req.body;
    newUser.id = generateId(data.users).toString(); // Convert to string to match existing ID format
    data.users.push(newUser);
    writeData(data);
    res.status(201).json(newUser);
});
// Route to get all blogs
app.get('/blogs', (req, res) => {
    const { blogs } = getData();
    res.json(blogs);
});
// Route to get all users
app.get('/users', (req, res) => {
    const { users } = getData();
    res.json(users);
});
// Route to get a specific blog by ID
app.get('/blogs/:id', (req, res) => {
    const { blogs } = getData();
    const blogId = req.params.id;
    const blog = blogs.find((blog) => blog.id === blogId);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404).send({ message: 'Blog not found' });
    }
});
// Route to update a blog by ID
app.put('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const updatedBlog = req.body;
    let data = getData();

    // Find the index of the blog to be updated
    const blogIndex = data.blogs.findIndex(blog => blog.id === id);
    if (blogIndex !== -1) {
        // Update the blog data
        data.blogs[blogIndex] = { ...data.blogs[blogIndex], ...updatedBlog };

        // Write the updated data back to the JSON file
        writeData(data);

        console.log(`Blog with id ${id} updated successfully`);
        res.status(200).send({ message: 'Blog updated successfully' });
    } else {
        res.status(404).send({ message: 'Blog not found' });
    }
});

// Route to delete a blog by ID using filter
app.delete('/blogs/:id', (req, res) => {
    const { id } = req.params;
    let data = getData();
    const initialLength = data.blogs.length;
    console.log('data before delete', JSON.stringify(data, null, 2))
    data.blogs = data.blogs.filter(blog => blog.id !== id);
  
    if (data.blogs.length === initialLength) {
        return res.status(404).send({ message: 'Blog not found' });
    }
    console.log('Data after deletion:', JSON.stringify(data, null, 2));

    writeData(data);
    console.log(`Blog with id ${id} deleted successfully`);
    res.status(200).send({ message: 'Blog deleted successfully' });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const { users } = getData();
    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).send({ message: 'Invalid username or password' });
    }
    // Generate a JWT token
  const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ user: { email: user.email , username: user.username}, token });
});

// Protected data route
app.get('/', (req, res) => {
    const authHeader = req.headers['x-access-token'] || req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token' });
        }
        res.json({ message: 'This is protected data', user: decoded });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
