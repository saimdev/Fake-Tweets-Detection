const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");
<<<<<<< HEAD
const authenticate = require("../middlewares/authenticate");
=======
>>>>>>> bba0265ba5ae2ef999c33a83ab953feac4cbf147

router.get('/', (req, res)=>{
    res.send("Hello from router server home page");
});

router.post('/signup', (req,res)=>{
    const {username, email, password} = req.body;
    const reports=0;
    if(!username || !email || !password){
        return res.status(422).json({error: "Plzz fill misisng fields"});
    }

    User.findOne({email:email})
    .then((userExist)=>{
        if(userExist){
            return res.status(422).json({error: "Email already registered"});
        }

        const newUser = new User({username, email, password, reports});

        newUser.save().then(()=>{
            res.status(201).json({message:"Successfully registered"})
        }).catch((err)=>{ res.status(500).json({error:"User not registered" })});
        
    }).catch((err)=>{console.log(err);})
    console.log(req.body);
});

router.post("/login", (req, res)=>{
    const {email, password} = req.body;
    let token;
    if(!email || !password){
        return res.status(422).json({error:"plzz fill missing fields"});
    }

    User.findOne({email:email})
    .then((checkUser)=>{
        if(checkUser){
            if(password == checkUser.password){
                checkUser.generateAuthToken()
                .then((token)=>{
                    console.log(token);
<<<<<<< HEAD
                    res.cookie("authToken", token);
                    res.status(200).json({message:"Succesfully logged in"});
                }).catch((err)=>{ console.log(err) });
=======
                    res.cookie("authToken", token, {
                        expires: new Date(Date.now() + 180000),
                        httpOnly:true
                    });
                }).catch((err)=>{ console.log(err) });
                
                return res.status(200).json({message:"Succesfully logged in"});
>>>>>>> bba0265ba5ae2ef999c33a83ab953feac4cbf147
            }
            else{
                res.status(401).json({error: "Invalid Email or Password"});
            }
        }
        else{
            res.status(400).json({error:"User not found"});
        }
        
    }).catch((err)=>{ console.log(err) })
});

<<<<<<< HEAD
app.get('/about', authenticate, (req, res) => {
  res.send('GET request to the homepage')
})

=======
>>>>>>> bba0265ba5ae2ef999c33a83ab953feac4cbf147
module.exports = router;