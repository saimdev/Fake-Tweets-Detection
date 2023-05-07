// requiring express
const express = require('express')
// putting all express functions in constant app
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
// for using json format
app.use(express.json());
//reuquiring connection file
require('./db/conn');
// importing routers file
app.use(require('./routers/auth'));
// defining port number from environment variable
const PORT = process.env.PORT;
// defining model variable
const User = require("./models/userSchema");
// requiring mongoose for database
const mongoose = require("mongoose");
//requiring dotenv
const dotenv  = require('dotenv')
// configuring the path of dotenv file
dotenv.config({path:'./config.env'});


// middleware has one more parameter which is next like where
// to go after we get responses
const middleware = (req, res, next)=>{
  console.log("Hello Middleware")
  next();
}


// on root directory, getting some response
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
});

app.get('/about', middleware, (req, res) => {
  res.send('GET request to the aboutpage')
})

// now to visualize that response of server
app.listen(PORT, ()=>{
    console.log("Server is running on port no.", PORT);
})

// terminal print
console.log("Revision of MERN")