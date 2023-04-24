// requiring express
const express = require('express')
// putting all express functions in constant app
const app = express();

// middleware has one more parameter which is next like where
// to go after we get responses
const middleware = (req, res, next)=>{
  console.log("Hello Middleware")
}




// on root directory, getting some response
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
});

// now to visualize that response of server
app.listen(3000, ()=>{
    console.log("Server is running on port no. 3000");
})

// terminal print
console.log("Revision of MERN")