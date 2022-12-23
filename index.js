const express = require("express");
const app = express();

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const cloudinary = require('cloudinary').v2;

dotenv.config();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
    });
app.post('/api/uploadimg', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr,{
            upload_preset: 'dev_setups',
            timeout:60000,
        },);
        console.log(uploadResponse.url);
        res.status(200).json({url:uploadResponse.url});
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});
    
app.use("/images", express.static(path.join(__dirname,"/images")));

mongoose.connect(process.env.MONGO_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
},(err) =>{
    if(err){
        console.log("err");
    }
    else{
        console.log("success");
    }
})

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, "images")
    },
    filename:(req,file,cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
})
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoryRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Backend is running");
})