const mongoose = require("mongoose");


const tagsSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        // ref is refrence to the Course
        ref:"Course"
    }
});


module.exports = mongoose.model("Tag",tagsSchema)