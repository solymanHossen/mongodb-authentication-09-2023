const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const getUsers = asyncHandler(async (req, res) => {
  const contacts = await userModel.find();
  res.status(200).json(contacts);
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUsers = await userModel.findOne({ email });
  if ((!name, !email, !password)) {
    res.status(400);
    throw new Error("all fields are required");
  }
  if (existingUsers) {
    return res.status(400).json({ message: "Email is already in use" });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data us not valid");
  }
  res.status(200).json(contact);
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    throw new Error("all fields are required");
  }
  const user = await userModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    console.log(user.password)
    const accessToken = jwt.sign(
      {
        user: {
          user: user.user,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

const currentUser=(req,res)=>{
    res.status(200).json(req.user);
}

module.exports = { getUsers, createUser, loginUser,currentUser };
