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

    // otp payload 
    const otpPayload = {email,otp};
    // store otp in db
    const otpBody = await OTP.create(otpPayload);
    console.log("otp body", otpBody);

    return res.status(200).json({
      success:true,
      message:"otp sent success fully",
      otp
    })
  } catch (error) {
    console.log("Error in generating OTP", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// sign up 

exports.signUp= async( req,res)=>{
  try{
    // data fetch from req. body 
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    contactNumber,
    otp
  } = req.body;

  if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
          success:false,
          message:"all field are required"
        })
      }
  // password and confirm password match 
  if(password !== confirmPassword){
    return res.status(400).json({
      success:false,
      message:"password and confirm password does not match "
    })
  }
  
  // check if user is exists or not

  // check duplicate mail
  const existingsUser = await User.findOne({email});
  // if duplicate found 
  if(existingsUser){
    return res.status(400).json({
      success:false,
      message:"user already exists"
    })
  }

  // find otp 
  // createdAt:-1 means decending order sorting 
  // if 1 means ascending order sorting 
  const recentOTP =  await OTP.find({email}).sort({createdAt:-1}).limit(1);
  console.log("recent otp is ", recentOTP);

  // otp validation 
  if(recentOTP.length ==0){
    return res.status(400).json({
      success:false,
      message:"otp not found"
    })
  }

  // match otp 
  if(otp !== recentOTP.otp){
    return res.status(400).json({
      success:false,
      message:"incorrect otp "
    })
  }

  // password hash 
  const hashedPassword = await bcrypt.hash(password,10);
  console.log("hashed password is ", hashedPassword);

  // store data to the data base 
  // which data to store in additionaal details ??
  const extraData = await  Profile.create({
    gender:null,
    dateOfBirth:null,
    about:null,
    contactNumber:null
  })

  // user model to store in database 
  const user  = await User.create({
    firstName,
    lastName,
    email,
    contactNumber,
    accountType,
    additionalDetails:extraData._id,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
  })

  // return success mark 
  return res.status(200).json({
    success:true,
    message:"user registered successfullt",
    data:user
  })
  }
  catch(error){
    console.log("error while user register entry",error);
    return res.status(500).json({
      success:false,
      message:"error in register user , !! please try again !!"
    })
  }
}
