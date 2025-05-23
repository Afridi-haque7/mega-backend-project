import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  
    // Configure mailgen by setting a theme and your product info
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://mailgen.js/",
    },
  });


  const emailBody = mailGenerator.generate(options.mailGenContent);

  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);


  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASSWORD,
    },
  })


  const mail = {
    from: "mail.example@taskmanager.com",
    to: options.email,
    subject: options.subject,
    text: emailText, // plain‑text body
    html: emailBody,
  };

  try {
    await transporter.sendMail(mail)
  } catch (error) {
    console.error("Email failed: ", error);
    
  }
};


const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
      body: {
        name: username,
        intro: `Welcome to Mailgen! We're very excited to have you on board.`,
        action: {
          instructions: "To get started with our application, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Verify your account",
            link: verificationUrl,
          },
        },
        outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
}

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: `We got a request to reset your password`,
      action: {
        instructions: "To change your password, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};



// sendMail({
//     email: user.email,
//     subject: "aaa",
//     mailGenContent: emailVerificationMailGenContent(
//         username,
//         ``
//     )
// })