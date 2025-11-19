import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const Email = async(req,res)=>{
     const {fullname, email, message, number,subject} = req.body
    //  console.log(fullname, email, message)
    try {
        let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,             
            service: 'gmail',
            auth : {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.PASSWORD,
            }
        });

        await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: "New Contact From Message",
            html:  
            `
                <h3>New Message Received</h3>
                <p><b>Name:</b> ${fullname}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Number:</b> ${number}</p>
                <p><b>Subject:</b> ${subject}</p>
                <p><b>Message:</b> ${message}</p>
            `
        })
        await transporter.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject:"Thank You for Contacting Me!",
            html: 
                `
                <h3>Hello ${fullname},</h3>
                <p>Thank you for your message. I will get back to you shortly.</p>
                `
        });
         res.json({ success: true, message: "Emails sent successfully!"});

    } catch (error) {
        console.error(error)
    }
}
