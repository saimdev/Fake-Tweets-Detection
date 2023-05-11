const express = require('express')
const router = express.Router();
const { PythonShell } = require('python-shell');
const { spawn } = require('child_process');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");
const Report = require("../models/reportSchema");
const mongoose = require('mongoose');

const authenticate = require("../middlewares/authenticate");


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
                    res.cookie("authToken", token);
                    res.status(200).json({message:"Succesfully logged in"});
                }).catch((err)=>{ console.log(err) });
            }
            else{
                res.status(401).json({error: "Invalid Email or Password"});
            }
        }
        else{
            res.status(400).json({error:"User not found"});
        }
        
    }).catch((err)=>{ res.status(500).json({error:"Server Side Error"}) });
});


router.get('/about', authenticate, (req, res, next) => {
  res.send(req.currentUser);
});

router.get('/getData', authenticate, (req, res, next) => {
    res.send(req.currentUser);
  });

router.get('/getReports', authenticate,  (req, res, next) => {
    console.log(req.userId);

    Report.find({ userId: req.userId}).then((reports)=>{
        console.log("Reports:",reports);
        if(reports){
            return res.status(200).json(reports);  
        } else {
            return res.status(404).json({error:"No reports found for user"});
        }
    }).catch((err)=>{
        res.status(500).json({error:"Internal server error"});
    });
    
    
});



  router.post('/uppercase', (req, res) => {
    const userInput = req.body.userInput;
  
    const pythonProcess = spawn('python', ['../pythonCode/app.py', userInput]);
  
    pythonProcess.stdout.on('data', (data) => {
      const result = data.toString().trim();
      console.log(result);
      res.json({ result });
    });
  
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      res.status(500).json({ error: 'Internal server error' });
    });
  
    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
  

  const addReport = async (req, res) => {
    try {
      const { userId, name, result } = req.body;
  
      // Create a new report document
      const report = new Report({
        userId: userId,
        name: name,
        result: result,
      });
  
      // Save the report to the database
      await report.save();
  
      // Return the newly created report
      res.status(201).json(report);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  router.post("/addreport", addReport);

  



module.exports = router;