import nodemailer from 'nodemailer';

export const EmailRegister = async (datos) => {
  const { email, name, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const information = await transport.sendMail({
    from: '"UpTask - Project Manager" <atending@uptask.com> ',
    to: email,
    subject: "New UpTask-Manager Account",
    text: "verify your account on UpTask-Manager",
    html: 
    `<head> 
      <style>
        .div {
          font-family: 'Arial', sans-serif;
        }
        .button {
          display: inline-block;
          font-size: 14px;
          padding: 10px 20px;
          margin-top: 15px;
          text-decoration: none;
          background-color: #4caf50;
          color: #ffffff;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: indigo;
        }
        .user-name {
          font-weight: bold;
          text-transform: capitalize;
        }
        .uptask {
          font-weight: bold;
          color: indigo;
        }
      </style>
     </head>
      <div>
        <p>Hello Dear: <span class="user-name">${name}</span>.</p>
        <p>It&apos;s a pleasure to have you in <span class="uptask">UpTask-Manager</span>. To complete your registration, please click on the following button: </p>
        <a class="button" href="${process.env.FRONTEND_URL}/authenticate/${token}"> Confirm my Account </a>
        <p>By clicking the button above, you will verify your account and can start using <span class="uptask">UpTask-Manager</span> without restrictions.</p> 
        <p>If you did not create this account, you can ignore this email.</p>
        <p>Thank you</p>
        <p>The <span class="uptask">UpTask-Manager</span> team.</p>
      </div>
    `,
  });
};

export const EmailForgotPassword = async (datos) => {
  const { email, name, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const information = await transport.sendMail({
    from: '"UpTask - Project Manager" <atending@uptask.com> ',
    to: email,
    subject: "Recover UpTask-Manager Account",
    text: "Forgot Password UpTask-Manager",
    html: 
    `<head> 
      <style>
        .div {
          font-family: 'Arial', sans-serif;
        }
        .button {
          display: inline-block;
          font-size: 14px;
          padding: 10px 20px;
          margin-top: 15px;
          text-decoration: none;
          background-color: #4caf50;
          color: #ffffff;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: indigo;
        }
        .user-name {
          font-weight: bold;
          text-transform: capitalize;
        }
        .uptask {
          font-weight: bold;
          color: indigo;
        }
      </style>
     </head>
      <div>
        <p>Hello Dear: <span class="user-name">${name}</span>.</p>
        <p>You have requested to reset your <span class="uptask">UpTask-Manager</span> password.</p>
        <a class="button" href="${process.env.FRONTEND_URL}/recover-password/${token}"> Reset your password </a>
        <p>By clicking the button above, you will able reset your <span class="uptask">UpTask-Manager</span> account.</p> 
        <p>If you did not need to reset your password, you can ignore this email.</p>
        <p>Thank you</p>
        <p>The <span class="uptask">UpTask-Manager</span> team.</p>
      </div>
    `,
  });
};
