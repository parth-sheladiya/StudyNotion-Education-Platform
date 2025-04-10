const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");

// send otp
exports.sendOTP = async (req, res) => {
  try {

    // fetch user email from body
    const { email } = req.body;

    // check if user is exists or not
    const checkUserExists = await User.findOne({ email });

    // if user is exists
    if (checkUserExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // log purpose
    console.log("otp", otp);

    // check otp is unique or not
    // but it is code check every time otp so db call is high 
    // find a library to generate unique otp
    const result = await OTP.findOne({ otp: otp });

    // if otp is unique
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: otp });
    }
  } catch (error) {
    console.log("Error in generating OTP", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
