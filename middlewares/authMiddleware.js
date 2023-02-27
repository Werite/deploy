import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization;
    } else {
      // JSON.stringify(req.cookies.localhost).token
      const cookieValue = JSON.parse(req.cookies.localhost).token;
      // if (cookieValue == undefined) {
      //   res.sendFile(views.newRoom)
      // }
      token = cookieValue;
    }

    if (!token) {
      return res
        .status(401)
        .json({
          message: "You are not logged in! Please log in to get access.",
        });
    }

    // 2) Verification token
    if (token.split(" ").length > 1) {
      //Remove if statement once frontend is done
      token = token.split(" ")[1];
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    let currentUser = await User.findById(decoded.id);

    currentUser = currentUser[0][0];

    if (!currentUser) {
      return res
        .status(401)
        .json({
          message: "The user belonging to this token does no longer exist.",
        });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
export { protect };
