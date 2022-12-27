const router = require("express").Router();
const Comment = require("../models/Comment");

router.post("/", async(req, res) => {
    const newComm = new Comment(req.body);
    try {
        const savedComm = await newComm.save();
        res.status(200).json(savedComm);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", async(req, res) => {
    const postId = req.query.id;
    try {
        const comms = await Comment.find({postId});
        res.status(200).json(comms);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const comm = await Comment.findById(req.params.id);
        await comm.delete();
        res.status(200).json("Comment has been deleted..");
        // if(comm.user === req.body.username){
        //     await comm.delete();
        //     res.status(200).json("Post has been deleted..");
        // }else{
        //     res.status(401).json("You can delete only your post!");
        // }
    } catch (error) {
        res.status(500).json(error);
    }
    
})

module.exports = router