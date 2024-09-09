const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Enable CORS for all origins
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to get the list of images in JSON format
app.get('/images', (req, res) => {
    // Create an array of image URLs from /images/image-1.jpg to /images/image-14.jpg
    const imageUrls = Array.from({ length: 14 }, (_, index) => ({
        imageUrl: `/images/image-${index + 1}.jpg`
    }));

    res.json(imageUrls);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
