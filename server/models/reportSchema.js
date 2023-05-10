const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    userId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    result:{
        type:String,
        required:true
    }
});

const Report = mongoose.model("REPORT", reportSchema);

module.exports = Report;