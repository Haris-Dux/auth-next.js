import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcrypt';


export const sendMail = async ({email,emailType,userId}:any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(),10);
    if(emailType === 'VERIFY'){
        await User.findByIdAndUpdate(userId,
            {verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000})
    } else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userId,
            {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000});
    }

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "d4892d14ea7e10",
          pass: "d59a8220016c57"
        }
      });

      const mailOptions = {
        from:'NextProject@gmail.com',
        to: email,
        subject: emailType === 'VERIFY' ? 'PLease Verify Your Email' : 'Please Reset Your Password',
        html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to 
        ${emailType === 'VERIFY' ? 'Verify Your Account' : 'Reset your password'} </p>`
      };

      const resEmail = transport.sendMail(mailOptions);
      return resEmail;
      
    } catch (error:any) {
        throw new Error()
    }
}