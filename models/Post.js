
const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique: false,
    },
    desc:{
        type:String,
        required: true,
    },
    photo:{
        type:String,
        required: false,
    },
    username:{
        type:String,
        required: true,
    },
    categories: {
        type: Array,
        required: false,
    },
    subcategories:{
        type: Array,
        required: false,
    },
    liked:{
        type: Array,
        required: false,
    },
    anonymous:{
        type: Boolean,
        default: false,
    }
},{timestamps: true});

module.exports = mongoose.model("Post", PostSchema);