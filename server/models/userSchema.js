const mongoose = require('mongoose');

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
    }
})

const User = mongoose.model("USER", userSchema);

module.exports = User;
