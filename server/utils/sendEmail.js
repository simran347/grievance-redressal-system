const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config();
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER_MAIL,
        pass:process.env.USER_PASS
    }
});

const sendEmail = async(to, subject, message)=>{
    try{
        await transporter.sendMail({
            from:`LNMU Grievance Redressal System ${process.env.USER_MAIL} `,
            to,
            subject,
            html:message,
        });
        console.log('Mail sented successfully');
        return true
    

     }catch(er){
        console.log(er);
        return false;
    }
}

module.export = sendEmail;