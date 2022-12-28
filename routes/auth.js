const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//for send mail
const sendVerifyMail = async(name, email, user_id)=>{
    try{
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user: 'iitiblogs@gmail.com',
                pass: 'dgamhfpqsmasbmth'
            }
        })
        const mailOptions = {
            from: 'iitiblogs@gmail.com',
            to: email,
            subject: 'Verification Mail',
            html: '<p>Hii' + name + ', please click here to <a href="https://iiti-blogs.cyclic.app/api/auth/verify?id='+user_id+'"> Verify </a> your mail.</p>'
        }
        transporter.sendMail(mailOptions, function(error,info){
            if(error){
                console.log(error);
            }
            else{
                console.log("Email has been sent:- ", info.response);
            }
        })

    }catch(error){
        console.log(error.message);
    }
}
//Register
router.post("/register", async(req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });
        const user = await newUser.save();
        await sendVerifyMail(req.body.name, req.body.email, user._id);
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err);
    }
})

// verify mail
router.get("/verify",async(req, res) =>{
    try{
        const updateInfo = await User.updateOne({_id:req.query.id},{$set:{isVerified:true}});
        console.log(updateInfo);
        res.send("<html> <head>Server Response</head><body><h1>Your Account has been Verified</h1></body></html>");
    }
    catch(error){
        console.log(error.message);
    }
})
//login
router.post("/login", async(req, res) =>{
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(400).json("Wrong username");
        }else{
            if(!user.isVerified){
                res.status(400).json("User not verified");
            }
            else{
                const validated = await bcrypt.compare(req.body.password, user.password);
                if(!validated){
                    res.status(400).json("Wrong Password");
                }else{
                    const {password, ...others} = user._doc;
                    res.status(200).json(others);
                }
            }
        }
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router