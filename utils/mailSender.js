const nodemailer = require("nodemailer")


const mailSender =  async(email , title , body) =>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });


        let info = await  transporter.sendMail({
            from:'study notion platform',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })

        console.log("email info include email , title , body" , info);
        return info;
    }
    catch(error){
        console.log("errror while mail sender" , error.message)
    }
}



module.exports =  mailSender