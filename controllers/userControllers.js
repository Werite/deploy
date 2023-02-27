import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateUploadImageURL } from "../s3.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, gender, mobile, username } = req.body;
    let user = new User(name, email, password, gender, mobile, username);

    user = await user.save();
    // console.log(user)

    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.user_id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    id: user.user_id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    username: user.username,
    merit: user.merit,
    token,
  });
};

const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password!" });
  }

  // 2) Check if user exists && password is correct
  let user = await User.findOne(email);
  user = user[0][0];

  if (!user || !User.matchPassword(user, password)) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  // 3) If everything ok, send token to client
  //   createSendToken(user, 200, res);
  createSendToken(user, 200, res);
};

const getUserProfile = async (req, res, next) => {
  try {
    let users = await User.findById(req.params.id);
    users = users[0];
    res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const getMyPosts = async (req, res, next) => {
  try {
    let userPosts = await User.findUserPosts(req.user.user_id);
    userPosts = userPosts[0];
    res.status(200).json(userPosts);
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const addMyBio = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const bio = req.body.bio;
    await User.addUserBio(user_id, bio);
    return res.status(200).json(bio);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const uploadProfile = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    console.log(req.file);
    const profilePath = req.file;
    const profileKeyPath = profilePath.originalname;
    let s3ImgUrl = await generateUploadImageURL(profileKeyPath, req.file);
    s3ImgUrl = s3ImgUrl.split("?")[0];
    await User.addProfileImage(user_id, s3ImgUrl);
    return res.status(200).json(s3ImgUrl);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

export {
  registerUser,
  authUser,
  uploadProfile,
  getUserProfile,
  getMyPosts,
  addMyBio,
};
