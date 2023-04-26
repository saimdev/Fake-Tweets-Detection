const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");

router.get('/', (req, res)=>{
    res.send("Hello from router server home page");
});

router.post('/register', (req,res)=>{
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

router.post("/signin", (req, res)=>{
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
                }).catch((err)=>{ console.log(err) });
                
                return res.status(200).json({message:"Succesfully logged in"});
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

module.exports = router;