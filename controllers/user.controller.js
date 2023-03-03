const { User, Email } = require("../models");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["email"] });

    for (let user of users) {
      const email = {
        to: user.email,
        from: "keepallyprivate@gmail.com",
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
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllUsers,
};
