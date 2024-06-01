import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to, user, subject, otp, emailType = 'registration') => {
    let htmlContent;

    if (emailType === 'registration') {
        htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <div style="text-align: center;">
                    <img src="https://res.cloudinary.com/dyflwb7am/image/upload/v1716883053/Share_Care_LOGO_jrn47n.png" alt="Share and Care" style="width: 100px; margin-bottom: 20px;">
                </div>
                <h2 style="color: #4CAF50; text-align: center;">Welcome to Share and Care!</h2>
                <p style="font-size: 16px; color: #333;">Dear ${user},</p>
                <p style="font-size: 16px; color: #333;">Thank you for registering with Share and Care. To complete your registration, please use the OTP below:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="display: inline-block; font-size: 24px; color: #fff; background-color: #4CAF50; padding: 10px 20px; border-radius: 5px;">${otp}</span>
                </div>
                <p style="font-size: 16px; color: #333;">This OTP is valid for 15 minutes. Please do not share this OTP with anyone.</p>
                <p style="font-size: 16px; color: #333;">If you did not request this OTP, please ignore this email.</p>
                <p style="font-size: 16px; color: #333;">Best regards,<br>Share and Care Team</p>
                <hr style="margin: 20px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} Share and Care. All rights reserved.</p>
            </div>
        `;
    } else if (emailType === 'contact_us') {
        htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <div style="text-align: center;">
                    <img src="https://res.cloudinary.com/dyflwb7am/image/upload/v1716883053/Share_Care_LOGO_jrn47n.png" alt="Share and Care" style="width: 100px; margin-bottom: 20px;">
                </div>
                <h2 style="color: #4CAF50; text-align: center;">Thank You for Contacting Us!</h2>
                <p style="font-size: 16px; color: #333;">Dear ${user},</p>
                <p style="font-size: 16px; color: #333;">Thank you for reaching out to Share and Care. We have received your message and our team will get back to you as soon as possible.</p>
                <p style="font-size: 16px; color: #333;">If you have any urgent queries, please feel free to contact us at support@shareandcare.com.</p>
                <p style="font-size: 16px; color: #333;">Best regards,<br>Share and Care Team</p>
                <hr style="margin: 20px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} Share and Care. All rights reserved.</p>
            </div>
        `;
    } else if (emailType === 'donar') {
        htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center;">
            <img src="https://res.cloudinary.com/dyflwb7am/image/upload/v1716883053/Share_Care_LOGO_jrn47n.png" alt="Share and Care" style="width: 100px; margin-bottom: 20px;">
        </div>
        <h2 style="color: #4CAF50; text-align: center;">Someone has accepted to volunteer your donation!</h2>
        <p style="font-size: 16px; color: #333;">Dear ${to.name},</p>
        <p style="font-size: 16px; color: #333;">We are pleased to inform you that ${user.name} has accepted to volunteer for your donation. Please be ready with the items you have provided in the form.</p>
        <p style="font-size: 16px; color: #333;">Volunteer Contact: ${user.phoneno}</p>
        <p style="font-size: 16px; color: #333;">Stay connected with us for any further assistance and thank you for your generosity.</p>
        <p style="font-size: 16px; color: #333;">Best regards,<br>Share and Care Team</p>
        <hr style="margin: 20px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} Share and Care. All rights reserved.</p>
    </div>
`;

    }
    else if (emailType === 'volunteer') {
        htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center;">
            <img src="https://res.cloudinary.com/dyflwb7am/image/upload/v1716883053/Share_Care_LOGO_jrn47n.png" alt="Share and Care" style="width: 100px; margin-bottom: 20px;">
        </div>
        <h2 style="color: #4CAF50; text-align: center;">Thank You for Volunteering!</h2>
        <p style="font-size: 16px; color: #333;">Dear ${to.name},</p>
        <p style="font-size: 16px; color: #333;">Thank you for volunteering to help with our donation efforts. Here are the details of the donation you have accepted:</p>
        <p style="font-size: 16px; color: #333;"><strong>Food Type:</strong> ${user.foodType}</p>
        <p style="font-size: 16px; color: #333;"><strong>Address:</strong> ${user.address}</p>
        <p style="font-size: 16px; color: #333;"><strong>Date:</strong> ${user.date}</p>
        <p style="font-size: 16px; color: #333;"><strong>Time:</strong> ${user.time}</p>
        <p style="font-size: 16px; color: #333;">Feel free to reach out to us in case of any inconvenience or call the donor for any further assistance you need.</p>
        <p style="font-size: 16px; color: #333;">Best regards,<br>Share and Care Team</p>
        <hr style="margin: 20px 0;">
        <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} Share and Care. All rights reserved.</p>
    </div>
`;

    }
    else if (emailType === 'forgot') {
        htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
    <div style="text-align: center;">
        <img src="https://res.cloudinary.com/dyflwb7am/image/upload/v1716883053/Share_Care_LOGO_jrn47n.png" alt="Share and Care" style="width: 100px; margin-bottom: 20px;">
    </div>
    <h2 style="color: #4CAF50; text-align: center;">Password Recovery</h2>
    <p style="font-size: 16px; color: #333;">Dear ${to.name},</p>
    <p style="font-size: 16px; color: #333;">We received a request to reset your password. Here is your new password:</p>
    <div style="background-color: #f9f9f9; border: 1px solid #e0e0e0; padding: 10px; border-radius: 5px; margin: 20px 0; text-align: center;">
        <strong style="font-size: 18px; color: #4CAF50;">${user}</strong>
    </div>
    <p style="font-size: 16px; color: #333;">We recommend that you change your password after logging in for security reasons.</p>
    <p style="font-size: 16px; color: #333;">If you did not request a password reset, please contact our support team immediately at support@shareandcare.com.</p>
    <p style="font-size: 16px; color: #333;">Best regards,<br>Share and Care Team</p>
    <hr style="margin: 20px 0;">
    <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} Share and Care. All rights reserved.</p>
</div>
`;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to.email || to,
        subject,
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
};
