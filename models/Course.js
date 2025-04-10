const mongoose = require("mongoose");

// course schema
const courseSchema =  new mongoose.Schema({

    courseSchema:{
        type:String,
        trim:true,
        required:true
    },
    courseDescription:{
        type:String,
        trim:true,
        required:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        // ref is refrence to the User
        ref:"User",
        required:true
    },
    whatYouWillLearn:{
        type:String,
        trim:true,
        required:true
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            // ref is refrence to the Section
            ref:"Section"
        }
    ],
    ratingAndReviews:[

       {
        type:mongoose.Schema.Types.ObjectId,
        // ref is refrence to the RatingAndReview
        ref:"RatingAndReview"
       }
    ],
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String
    },
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        // ref is refrence to the Tag
        ref:"Tag"
    },
    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            // ref is refrence to the user
            ref:"User"
        }
    ]
});



module.exports = mongoose.model("Course",courseSchema);