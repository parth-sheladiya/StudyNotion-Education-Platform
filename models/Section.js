const mongoose = require("mongoose");


const sectionSchema = new mongoose.Schema({

    sectionName:{
        type:String
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            // ref is refrence to the SubSection
            ref:"SubSection"
        }
    ]
})

module.exports = mongoose.model("Section",sectionSchema);