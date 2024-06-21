const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();

const getData = require('./getData');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

// Utility function to generate a new unique ID
const generateId = (items) => {
    if (items.length === 0) return 1;
    const ids = items.map(item => parseInt(item.id, 10));
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
    const { title, body, author, fullDate, time } = req.body;
    const photoFile = req.files?.image;
    
    const data = getData();
    let photoPath = null;
    if (photoFile) {
        const uploadDir = 'src/images/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const photoFilename = `${Date.now()}-${photoFile.name}`;
        const photoFilePath = path.join(uploadDir, photoFilename);
        photoFile.mv(photoFilePath, (err) => {
            if (err) {
                console.error('Error uploading photo:', err);
                return res.status(500).json({ message: 'Error uploading photo. Please try again later.' });
            }
        });
        photoPath = `images/${photoFilename}`;
    }

    const newBlog = { id: generateId(data.blogs).toString(), title, body, author,fullDate, time, image: photoPath };
    data.blogs.push(newBlog);
    writeData(data);
    res.status(201).json(newBlog);
});
// Route to create a new user
app.post('/users',(req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;
        const photoFile = req.files?.photo;
    
        const data = getData();
        const existingUser = data.users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        let photoPath = null;
        if (photoFile) {
            const uploadDir = 'src/images/';
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const photoFilename = `${Date.now()}-${photoFile.name}`;
            const photoFilePath = path.join(uploadDir, photoFilename);
            photoFile.mv(photoFilePath, (err) => {
                if (err) {
                    console.error('Error uploading photo:', err);
                    return res.status(500).json({ message: 'Error uploading photo. Please try again later.' });
                }
            });
            photoPath = `images/${photoFilename}`;
        }

        const newUser = { id: generateId(data.users).toString(), username, email, password, 'confirm-password': confirm_password, photo: photoPath };
        data.users.push(newUser);
        writeData(data);

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).json({ message: 'Error creating new user. Please try again later.' });
    }
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
app.get('/blogs/blog/:id', (req, res) => {
    const { blogs } = getData();
    const blogId = req.params.id;
    const blog = blogs.find((blog) => blog.id === blogId);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404).send({ message: 'Blog not found' });
    }
});
// Route to get a specific blog by author name
app.get('/blogs/author/:author', (req, res) => {
    const { blogs } = getData();
    const authorName = req.params.author.toLowerCase();
    const authorBlogs = blogs.filter((blog) => blog.author.toLowerCase() === authorName);
    if (authorBlogs) {
        res.json(authorBlogs);
    } else {
        res.status(404).send({ message: 'Blog not found' });
    }
});
app.get('/users/profile/:author', (req, res) => {
    const { users } = getData();
    const authorName = req.params.author.toLowerCase();
    const authorProfile = users.filter((user) => user.username.toLowerCase() === authorName);
    if (authorProfile.length > 0) {
        res.json(authorProfile[0]);
    } else {
        res.status(404).send({ message: 'This user is not exist' });
    } 
});
// Route to update a blog by ID
app.put('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const { title, body, author } = req.body;
    const photoFile = req.files?.image;

    let data = getData();

    // Find the index of the blog to be updated
    const blogIndex = data.blogs.findIndex(blog => blog.id === id);
    if (blogIndex !== -1) {
        let photoPath = data.blogs[blogIndex].image; // Use the existing image path if no new image is provided

        if (photoFile) {
            const uploadDir = 'src/images/';
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const photoFilename = `${Date.now()}-${photoFile.name}`;
            const photoFilePath = path.join(uploadDir, photoFilename);
            photoFile.mv(photoFilePath, (err) => {
                if (err) {
                    console.error('Error uploading photo:', err);
                    return res.status(500).json({ message: 'Error uploading photo. Please try again later.' });
                }
            });
            photoPath = `images/${photoFilename}`;
        }

        // Update the blog data
        const updatedBlog = {
            id: data.blogs[blogIndex].id,
            title,
            body,
            author,
            fullDate: data.blogs[blogIndex].fullDate,
            time: data.blogs[blogIndex].time,
            image: photoPath
        };
        data.blogs[blogIndex] = updatedBlog;

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
