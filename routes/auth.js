const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const dotenv = require("dotenv");
dotenv.config();
//for send mail
const sendVerifyMail = async(name, email, user_id)=>{
    try{
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            tls: {
                rejectUnauthorized: false
            },
            auth:{
                user: 'iitiblogs@gmail.com',
                pass: process.env.SMTP_PASS,
            }
        })
        const mailOptions = {
            from: 'iitiblogs@gmail.com',
            to: email,
            subject: 'Verification Mail',
            html: '<p>Hii ' + name + ', please click here to <a href="https://iiti-blogs.cyclic.app/api/auth/verify?id='+user_id+'"> Verify </a> your mail.</p>'
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
        console.log(error.message)
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
        try{
            await sendVerifyMail(user.username, user.email, user._id);
            res.status(200).json(user);
        }
        catch(err){
            await User.findByIdAndDelete(user._id);
            res.status(400).json("Error while sending verification mail");
        }
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
// send token email
const sendToken = async(name, email, token)=>{
    try{
        const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user: 'iitiblogs@gmail.com',
                pass: process.env.SMTP_PASS,
            }
        })
        const mailOptions = {
            from: 'iitiblogs@gmail.com',
            to: email,
            subject: 'Token to reset password',
            html: '<p>Hii ' + name + ', the token to reset password is: '+ token+ '</p>'
        }
        transporter.sendMail(mailOptions, function(error,info){
            if(error){
                console.log(error);
            }
            else{
                console.log("Token email has been sent:- ", info.response);
            }
        })

    }catch(error){
        console.log(error.message)
    }
}
// forget Password
router.put("/forgetPassword", async(req, res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(user){
            const randomString = randomstring.generate();
            const data = await User.updateOne({email:req.body.email},{$set:{token:randomString}});
            sendToken(user.username, user.email, randomString);
            res.status(200).json(data);
        }
        else{
            res.status(400).json("Email not found");
        }
    }
    catch(err){
        res.status(400).json("Error");
    }
})
// reset Password
router.put("/resetPassword", async(req, res)=>{
    try{
        const user = await User.findOne({token:req.body.token});
        if(user){
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const data = await User.findByIdAndUpdate({_id:user._id},{$set:{token:"", password:hashedPass}},{new:true});
            res.status(200).json(data);
        }
        else{
            res.status(400).json("Token not found");
        }
    }
    catch(err){
        res.status(400).json("Error");
    }
})

module.exports = router