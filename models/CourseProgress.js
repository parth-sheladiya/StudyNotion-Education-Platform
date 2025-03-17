const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({

    courseID :{
        type:mongoose.Schema.Types.ObjectId,
        // ref is refrence to the Course
        ref:"Course"
    },
    completedVideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            // ref is refrence to the SubSection
            ref:"SubSection"
        }
    ]

})

module.exports = mongoose.model("CourseProgress",courseProgress)