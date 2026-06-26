const nodeMailer = require("nodemailer");

const sendMail = async(to, subject, text)=>{
    try {
        const transporter = nodeMailer.createTransport({
            service:"Gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOption = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }

        const isSent = await transporter.sendMail(mailOption);
        console.log("dekho bhai",isSent)
    } catch (error) {
        console.log("Unable to send Email: ", error);
    }
}

module.exports = sendMail;