const express = require('express')
const router = express.Router()
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

    if(!email || !password){
        return res.status(422).json({error:"plzz fill missing fields"});
    }

    User.findOne({email:email})
    .then((checkUser)=>{
        if(checkUser){
            return res.status(201).json({message:"Logged in successfully"});
        }
        res.status(400).json({error:"User not found"});
    }).catch((err)=>{ console.log(err) })
});

module.exports = router;