const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    user:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        default: ""
    }
},{timestamps: true});

module.exports = mongoose.model("Comment", CommentSchema);