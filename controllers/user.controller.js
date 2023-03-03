const { User, Email } = require("../models");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

// const JWT_SECRET = "secret_key";

const registerUser = async (req, res) => {
  console.log("you can create a user");

  User.create({
    firstName: "divine",
    email: "divinemaina@gmail.com",
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.send("insert");
};

const authUser = async (req, res) => {
  res.send('<a href="/users/auth/google">authenticate with google </a>');
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["email"] });

    for (let user of users) {
      const email = {
        to: user.email,
        from: "divinemaina@gmail.com",
        subject: "Test sendGrid",
        text: "This is a test for send grid",
        html: "<p>Example Body</p>",
      };
      await sgMail.send(email);
      await Email.create({
        recipient: email.to,
        subject: email.subject,
        body: email.text,
      });
    }
    return res
      .status(200)
      .json({ message: "Emails sent and saved successfully" });

    // res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  authUser,
  registerUser,
  getAllUsers,
};
