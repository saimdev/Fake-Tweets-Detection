const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:false
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    reports:{
        type: Number,
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

userSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}


const User = mongoose.model("USER", userSchema);

module.exports = User;
