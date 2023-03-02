// const { User } = require("../models");

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll({});
//     return res.status(200).json({ users });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };

// module.exports = {
//   getAllUsers,
// };

const { User } = require("../models");

// const JWT_SECRET = "secret_key";

const registerUser = async(req,res) => {
console.log("you can create a user");

  User.create({
    firstName: "jeannete",
    email: "jeannette@gmail.com"
}).catch(err =>{
    if (err){
        console.log(err)
    }
})
res.send("insert")

};

const authUser=async(req,res)=>{
  res.send('<a href="/users/auth/google">authenticate with google</a>')
}
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  authUser,
  registerUser,
  getAllUsers
};