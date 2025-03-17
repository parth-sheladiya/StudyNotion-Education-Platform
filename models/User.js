const mongoose = require("mongoose");


// user schema include field
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Instructor", "Student"],
    required: true,
    // default:"Student"
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // ref is the reference of Profile model
    ref: "Profile",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // ref is the reference of Course model
      ref: "Course",
    },
  ],
  image: {
    type: String,
    required: true,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // ref is the reference of CourseProgress model
      ref: "CourseProgress",
    },
  ],
});


module.exports = mongoose.model("User", userSchema);