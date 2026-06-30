require('dotenv').config();

const express = require('express');
const multer = require('multer');
const postModel = require('./models/post.model.js');
const uploadImageToImageKit = require('./services/storage.service.js');

const app = express();
app.use(express.json());

// Configure multer for handling form-data
const upload = multer({ storage: multer.memoryStorage() });

app.post('/create-post', upload.single('image'), async (req, res) => {
    try {
        

        const result = await uploadImageToImageKit(req.file.buffer);
        const newPost = new postModel({
            image: result.url,
            caption: req.body.caption
        });
        const savedPost = await newPost.save();
        console.log('Image uploaded to ImageKit:', result);
        console.log('Post saved to MongoDB:', savedPost);
        res.json({ success: true, message: 'Post created', post: savedPost });
    }
    catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating post',
            error: error.message
        });
    }
});

module.exports = app 