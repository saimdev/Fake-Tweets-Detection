const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const Authenticate = async (req, res, next)=>{
    try {
        // getting token from cookies
        const token = req.cookies.authToken;
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

    module.exports = Authenticate;
}