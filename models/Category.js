
const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subcategories:{
        type: Array,
        default: null,
    },
},{timestamps: true});

module.exports = mongoose.model("Category", CategorySchema);