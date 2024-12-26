// Create web server
// 1. Create express server
// 2. Set up port
// 3. Set up routes
// 4. Set up middleware
// 5. Start server

// 1. Create express server
const express = require('express');
const app = express();
const comments = require('./comments.json');

// 2. Set up port
const port = 3000;

// 3. Set up routes
app.get('/', (req, res) => {
    res.send('Welcome to the comments service');
});

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).send('The comment with the given ID was not found');
    }
    res.json(comment);
});

// 4. Set up middleware
app.use(express.json());

app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        body: req.body.body
    };
    comments.push(comment);
    res.json(comment);
});

// 5. Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});