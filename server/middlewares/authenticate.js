// It first checks if the user has an authToken cookie or not. 
// If not, it returns an error. If yes, it verifies the token 
// using the secret key and retrieves the user details.
// It then checks if the user exists in the database and if the token in 
// the database matches the one in the cookie. If everything is okay, 
// it attaches the user details and token to the request object and calls the next middleware function.

const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const Authenticate = async (req, res, next)=>{
    try {
        const authToken = req.cookies.authToken || req.headers.authorization;

        if (!authToken) {
          return res.status(401).json({ error: "Authentication failed" });
        }
        // getting token from cookies
        const token = req.cookies.authToken;
        console.log("token",token);

        // verifying token by comparing with secrete key, and in this variablewe get all details of user with
        // that token
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // now we find the user through verifytoken, we match id of user with the id of verifytoken
        // and also check that token present in that user's table is equals to token present in cookies 
        // or not
        const currentUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});

        if(!currentUser){
            throw new Error("User not found");
        }

        req.token= token;
        req.currentUser = currentUser;
        req.userId = currentUser._id

        next();

    } catch (error) {
        console.log(error)
    }
}

module.exports = Authenticate;
