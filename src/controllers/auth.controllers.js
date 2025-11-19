import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getDB } from "../services/database.services.js";

export async function login(req, res) {
  const { username, password, rememberMe = false } = req.body;

  // console.log(req.body);

  if (!username || !password) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng nhập đầy đủ username và mật khẩu",
    });
  }

  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ username });
    // console.log(user);

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "username hoặc mật khẩu không chính xác",
      });
    }

    // So sánh mật khẩu
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    // console.log(password);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ status: false, message: "Mật khẩu không chính xác" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role || "UNKNOWN",
        name: user.ho_ten,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: rememberMe ? process.env.JWT_EXPIRES_IN || "7d" : "2h",
      }
    );

    return res.json({
      status: true,
      message: "Đăng nhập thành công",
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: false,
      message: "Lỗi máy chủ",
    });
  }
}

export async function register(req, res) {}
