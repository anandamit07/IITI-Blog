const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const cloudinary = require('cloudinary').v2;
//Create Post
router.post("/", async(req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
})


//Update Post
router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true});
            res.status(200).json(updatedPost);
        }else{
            res.status(401).json("You can update only your post!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
    
})

//Delete Post
router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            await post.delete();
            res.status(200).json("Post has been deleted..");
        }else{
            res.status(401).json("You can delete only your post!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
    
})

//Get Post
router.get("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get all Posts
router.get("/", async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    const subcatName = req.query.subcat;
    try{
        let posts;
        if(username){
            posts = await Post.find({username});
        } else if(catName) {
            if(subcatName){
                posts = await Post.find({categories:{
                    $in:[catName]
                }}).find({subcategories:{
                    $in:[subcatName]
                }});
            }else{
                posts = await Post.find({categories:{
                    $in:[catName]
                }});
            }
        } 
        else{
            posts = await Post.find();
        }
        const sortedPosts = posts.sort((a, b) => b.liked.length - a.liked.length);
        res.status(200).json(sortedPosts);
    }catch(err){
        res.status(500).json(err);
    }
})

// Like the post
router.put("/like/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.liked.includes(req.body.username)){
            post.liked.splice(post.liked.indexOf(req.body.username),1);
        }
        else{
            post.liked.push(req.body.username);
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: post},{new: true});
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
    }
    
})

// upload image
// router.post("/upload", async(req, res) => {
//     console.log(req.body);
//     try{
//    
//         });
//     }catch(err){
//         console.log("not connected");
//         res.status(500).json("not connected to cloudinary");
//     }
//     try{
//         await cloudinary.uploader.upload(req.body.image, (error, result) => {
//             if (error) {
//                 console.error(error);
//             } else {
//                 console.log(result.url);
//                 res.status(200).json(result);
//             }
//             });
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
    
// })

router.put("/changeAuthorVis/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            post.anonymous = !post.anonymous;
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set:post},{new: true});
            res.status(200).json(updatedPost);
        }else{
            res.status(401).json("You can update only your post!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
    
})

module.exports = router