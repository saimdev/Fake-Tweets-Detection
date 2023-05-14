const express = require('express')
const router = express.Router();
const { PythonShell } = require('python-shell');
const { spawn } = require('child_process');
const jwt = require('jsonwebtoken');
const User = require("../models/userSchema");
const Report = require("../models/reportSchema");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const authenticate = require("../middlewares/authenticate");


router.get('/', (req, res)=>{
    res.send("Hello from router server home page");
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, '../client/src/imgs');
  },
  filename: function(req, file, cb) {
      cb(null, req.body.username + '.jpeg');
  }
});
const upload = multer({ storage: storage });

router.post('/signup', upload.single('image'), (req,res)=>{
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

router.get('/profile-img/:username', (req, res)=>{
  const username = req.params.username;
  const imagePath = path.join(__dirname,'..', '..','client', 'src', 'imgs', `${username}.jpeg`);
  res.sendFile(imagePath);
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

router.get('/getLastReports',authenticate,(req,res)=>{
  console.log(req.userId)

  Report.find({userId: req.userId}).limit(4).then((reports)=>{
      console.log("Reports:",reports)
      if(reports.length <= 4){
          return res.status(200).json(reports);
      }else{
          return res.status(404).json({error:"No reports found"})
      }
  }).catch((err)=>{
      res.status(500).json({error:"Internal server error"});
  })
})


router.post('/sendmail', async (req, res)=>{
  try {
    const {name, email} = req.body;
    console.log(email);
     // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'sabbas486249@gmail.com', // your Gmail account username
        pass: process.env.GMAIL_PASS, // your Gmail account password
      },
    });
console.log(email);
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: `"FAKE NEWS DETECTION SYSTEM" <sabbas486249@gmail.com>`, // sender address
          to: email, // list of receivers
          subject: 'FAKE NEWS DETECTION', // Subject line
          html: '<h1>Thanks for subscription!</h1><p>Thank you for subscribing to our fake news detection system. Stay informed and protected from misinformation with our service.</p>'
        });

        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ message: 'Email sent successfully' });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal Server Error"})
  }
})


  router.post('/getResult', authenticate, (req, res, next) => {
      console.log("saim")
      const {name, userInput}=req.body;
      if(!name || !userInput){
        res.status(422).json({error:"Please Fill missing fields"});
      }
      console.log(name);
      console.log(userInput);
      const pythonProcess = spawn('python', ['../pythonCode/i21_2083/ml.py', userInput]);
    
      pythonProcess.stdout.on('data', async (data) => {
        const result = data.toString().trim();
        console.log(result);
        res.json({ result });
        const report = new Report({
          userId: req.userId,
          name: name,
          result: result,
        });
    
        // Save the report to the database
        await report.save();
      });
    
      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).json({ error: 'Internal server error' });
      });
    
      pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    
  });
  

  const addReport = async (userId, name, result) => {
    try {
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


  



module.exports = router;