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
        const Post = await postModel.create({
            image: result.url,
            caption: req.body.caption
        });
        
        console.log('Image uploaded to ImageKit:', result);
        console.log('Post saved to MongoDB:', Post);
        res.json({ success: true, message: 'Post created' });
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

app.get('/posts', async (req, res) => { 
    const posts = await postModel.find();
    return res.status(200).json({ success: true, posts });
});
module.exports = app 