const transporter = require('../config/transporter');
const fs = require('fs');
const path = require('path')

// Read the email template
let emailTemplate = fs.readFileSync('./templates/emailTemplate.html', 'utf-8');

/** @return {String} */
const generateOTP = () => {
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString(); // Convert to string
}

/**
 *  @param {String} email
 *  @return {Promise}
 * */
const sendMail = async (email) => {
    try {
        const otp = generateOTP();

        emailTemplate = emailTemplate
            .replace('{{otp}}', otp)
            .replace('{{name}}', 'Code king');


        const mailOptions = {
            from: `"Code King" <codeking@code.com>`, // sender address
            to: email,
            subject: 'OTP',
            html: emailTemplate
        };

        await transporter.sendMail(mailOptions,  (error, info) => {
            if (error) {
                return { otp: undefined, error }
            }
        });

        return { otp, error: undefined }

    } catch (e) {
        console.log(e)
        return { otp: undefined, error: 'server error'}
    }
}

module.exports = {sendMail}
