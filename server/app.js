// requiring mongoose for database
const mongoose = require("mongoose");
// requiring express
const express = require('express')
// putting all express functions in constant app
const app = express();

const DB="mongodb+srv://sabbas486249:Raza5085458@cluster0.99oj3k2.mongodb.net/mlproject?retryWrites=true&w=majority"

mongoose.connect(DB).then(()=>{
  console.log("DB CONNECTED");
}).catch((err)=>{console.log(err)})

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
app.listen(3000, ()=>{
    console.log("Server is running on port no. 3000");
})

// terminal print
console.log("Revision of MERN")