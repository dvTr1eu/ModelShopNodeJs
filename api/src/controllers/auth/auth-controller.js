const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { response } = require("express");

//register
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({ success: false, message: "Email đã tồn tại" });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Đăng ký tài khoản thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some erroe occured",
    });
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "Người dùng không tồn tại. Hãy đăng ký mới",
      });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword)
      return res.json({
        success: false,
        message: "Mật khẩu không đúng",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Đăng nhập thành công",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username: checkUser.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some erroe occured",
    });
  }
};

//logout

const logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Bạn đã đăng xuất tài khoản",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Người dùng không được cấp phép",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Người dùng không được cấp phép",
    });
  }
};

module.exports = { register, login, logout, authMiddleware };
