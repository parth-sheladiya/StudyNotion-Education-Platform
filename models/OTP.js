const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");


const otpSchema = new mongoose.Schema({

    email:{
        type:String,
        reuired:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})

// function to  send  email 

async function sendVerificationEmail(email, otp){
    try{
        const mailResponse =  await mailSender(email, "verification mail from study notion platform", otp);
        console.log("email sent success",mailResponse)
    }
    catch(error){
        console.log("error while send verification mail" , error );
        throw error;
    }

}


otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email, this.otp)
})

module.exports = mongoose.model("OTP",otpSchema)