const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async(req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get("/", async(req, res) => {
    if(req.query.id){
        try {
            const cat = await Category.findById(req.query.id);
            res.status(200).json(cat);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else if(req.query.name){
        try {
            const cat = await Category.find({name:req.query.name});
            res.status(200).json(cat);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        try {
            const cats = await Category.find();
            res.status(200).json(cats);
        } catch (error) {
            res.status(500).json(error);
        }
    }
})

module.exports = router