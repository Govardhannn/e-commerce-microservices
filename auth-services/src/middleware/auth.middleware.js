import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = decoded;

    req.user = user; // attach user info to request

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
