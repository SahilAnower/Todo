const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { errorHandler } = require("../utils/errors");
const Otp = require("../models/otp");
const nodemailer = require("nodemailer");

const sendResetLinkToMail = async (mail, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "todo.moderator@gmail.com",
      pass: "uwuujidioqfezzqg",
    },
  });

  const mailOptions = {
    from: "todo.moderator@gmail.com",
    to: `${mail}`,
    subject: "Password Reset Link - Below 👇🏻",
    text: `Your One-Time-Password is: ${otp}`,
    html: `Your One-Time-Password is: ${otp}`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.postRegisterUser = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return next(
      errorHandler({
        status: 400,
        message: "Name, Email and Password is Required",
      })
    );
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.status(201).json("New User Created");
  } catch (err) {
    next(err);
  }
};

exports.postLoginUser = async (req, res, next) => {
  if (!req.body.password || !req.body.email)
    return next(
      errorHandler({ status: 400, message: "Name and Email is Required" })
    );
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return next(errorHandler({ status: 404, message: "No user found" }));
    }

    // console.log(user.password)

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    console.log(user);
    if (isPasswordValid) {
      const payload = {
        id: user._id,
        name: user.name,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json({ message: "Login Success" });
    } else {
      return next(
        errorHandler({ status: 400, message: "Password is Incorrect" })
      );
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.logOutUser = async (req, res, next) => {
  await res.clearCookie("access_token");
  return res.status(200).json({ message: "Logout Success" });
};

exports.isLoggedIn = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.json(false);
  return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.json(false);
    else return res.json(true);
  });
};

exports.emailSend = async (req, res, next) => {
  // Body-> email
  let data = null;
  try {
    data = await User.findOne({
      email: req.body.email,
    });
  } catch (err) {
    return next(err);
  }
  if (data) {
    let max=9999
    let min=1000
    let otpCode = Math.floor(Math.random() * (max - min + 1)) + min;;
    let otpData = new Otp({
      email: req.body.email,
      code: otpCode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    try {
      let otpResponse = await otpData.save();
      sendResetLinkToMail(req.body.email, otpCode);
      return res.status(200).json({
        statusText: "Success",
        message: "Check your mail for Otp",
      });
    } catch (err) {
      return next(err);
    }
  } else {
    return res.status(200).json({
      statusText: "Error",
      message: "Mail Id doesn't exist",
    });
  }
};

exports.validateOtp = async (req, res, next) => {
  // Body-> email,otpCode
  let data = null;
  try {
    data = await Otp.find({
      email: req.body.email,
      code: req.body.otpCode,
    });
  } catch (err) {
    return next(err);
  }
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      return res.json({
        statusText: "Error",
        message: "Token Expired",
      });
    } else {
      return res.json({
        statusText: "Success",
        message: "OTP Verified Successfully against the database",
      });
    }
  } else {
    return res.json({
      statusText: "Error",
      message: "Invalid OTP",
    });
  }
};

exports.changePassword = async (req, res, next) => {
  // Body -> email,password
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.findOneAndUpdate({ email: req.body.email },{password: newPassword},{new: true});
    return res.json({
      statusText: "Success",
      message: "Password Changed Successfully",
    });
  } catch (err) {
    return next(err);
  }
};
