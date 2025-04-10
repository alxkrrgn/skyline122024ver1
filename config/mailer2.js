const nodemailer = require('nodemailer');
require('dotenv').config();

const mailer = {
  transporter: nodemailer.createTransport({
    host: process.env.SES_SMTP_HOST,
    port: process.env.SES_SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SES_SMTP_USERNAME,
      pass: process.env.SES_SMTP_PASSWORD
    },
    tls: {
      ciphers: 'TLSv1.2',
      rejectUnauthorized: true
    }
  }),

  sendContactForm: async ({ email, name, subject, message }) => {
    try {
      // Get current date and time in local format
      const currentDateTime = new Date().toLocaleString();

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: subject || 'New Contact Form Submission',
        text: `
          New message from website contact form:
          
          From: ${name} <${email}>
          Subject: ${phonenumber}
          Date/Time: ${currentDateTime}
          
          Message:
          ${question}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #333;">New message from website contact form</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">From:</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${name} &lt;${email}&gt;</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Subject:</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${phonenumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Date/Time:</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${currentDateTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-line;">${question}</td>
              </tr>
            </table>
          </div>
        `,
        replyTo: email
      };

      const info = await mailer.transporter.sendMail(mailOptions);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Mailer error:', error);
      return { success: false, error: error.message };
    }
  }
};

module.exports = mailer;

mailer.testConnection = async () => {
  try {
    await mailer.transporter.verify();
    console.log('Server is ready to send emails');
  } catch (error) {
    console.error('Connection test failed:', error);
  }
};

// Run the test
mailer.testConnection();