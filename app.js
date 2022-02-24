
const express = require('express');
const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world');
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
