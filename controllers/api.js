const Post = require('../models/posts');
const fs = require("fs");
const path = require("path");

module.exports = class API {
    // fetch all post
    static async fetchAllPost(req, res) {
        try {
            const posts = await Post.find();
            res.json(posts);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    // fetch post by id
    static async fetchPostById(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            res.json(post)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    // create a post
    static async createPost(req, res) {
        const post = req.body;
        const imagename = req.file.filename;
        post.image = imagename;
        try {
            await Post.create(post);
            res.status(201).json({message: `Post created successfully!`});
        } catch (error) {
            res.status(400).json({message: error.message});
        }

    }
    // create a post
    static async updatePost(req, res) {
        const id = req.params.id;
        let newImage = '';
        if (req.file) {
            newImage = req.file.filename;
            try {
                fs.unlinkSync(path.join(__dirname, `../uploads/${req.body.oldImage}`));
            } catch (error) {
                console.log(error);
            }
        } else {
            newImage = req.body.oldImage;
        }
        const newPost = req.body;
        newPost.image = newImage;
        
        try {
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({message: `Post updated successfully!`});
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
    // create a post
    static async deletePost(req, res) {
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            if (result.image != '') {
                try {
                    fs.unlinkSync(`./uploads/${result.image}`);
                } catch (error) {
                    console.log(error)
                }
            }
            res.json({message: 'Post deleted successfully!'});
        } catch (error) {
            res.status(404).json({message: error.message})
        }
    }
}