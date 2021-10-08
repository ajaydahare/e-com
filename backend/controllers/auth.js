import User from "../models/user.js";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import dotenv from "dotenv";
dotenv.config();

export const signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Email already in use",
      });
    }
    res.json({
      message: "Accout was created ",
    });
  });
};

export const signin = (req, res) => {
  //check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  //authenticate user
  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    if (!user) {
      return res.status(401).json({
        error: "user not found on this email",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "password do not match",
      });
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //put token in cookie
    res.cookie("token", token, { exprireIn: new Date() + 9999 });

    //send respose in frontend
    const { _id, name, lastname, email, role } = user;
    return res.json({ token, user: { _id, name, lastname, email, role } });
  });
};

export const signout = (req, res) => {
  return res.json({ message: "sign out " });
};

//middleware
export const isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

export const isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "you are not a admin",
    });
  }
  next();
};
