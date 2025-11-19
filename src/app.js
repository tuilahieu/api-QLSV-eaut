import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../services/database.services.js";

import authRoutes from "../routes/auth.routes.js";
import facultyRoutes from "../routes/faculty.routes.js";
import majorRoutes from "../routes/major.routes.js";
import userRoutes from "../routes/user.routes.js";
import classRoutes from "../routes/class.routes.js";
import subjectRoutes from "../routes/subject.routes.js";
import scheduleRoutes from "../routes/schedule.routes.js";
import studentStudyRoutes from "../routes/student_study.routes.js";
import studentScoreRoutes from "../routes/student_score.routes.js";
import paymentScoreRoutes from "../routes/payment.routes.js";
import attendanceScoreRoutes from "../routes/attendance.routes.js";
import subjectClassRoutes from "../routes/subject_class.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS
if (process.env.DEV_MODE) {
  app.use(cors());
} else {
  app.use(
    cors({
      origin: process.env.DOMAIN_ALLOWED?.split(",") || "*",
    })
  );
}

// MongoDB connect (only once)
let dbConnected = false;
app.use(async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
      console.log("MongoDB connected (Vercel)");
    } catch (err) {
      console.error("MongoDB connect error:", err);
    }
  }
  next();
});

// Prefix API
const API_PREFIX = "/api";

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/khoa`, facultyRoutes);
app.use(`${API_PREFIX}/nganh`, majorRoutes);
app.use(`${API_PREFIX}/ho-so-ca-nhan`, userRoutes);
app.use(`${API_PREFIX}/lop-hoc`, classRoutes);
app.use(`${API_PREFIX}/mon-hoc`, subjectRoutes);
app.use(`${API_PREFIX}/lich`, scheduleRoutes);
app.use(`${API_PREFIX}/thong-tin-hoc-van`, studentStudyRoutes);
app.use(`${API_PREFIX}/diem-hoc-tap`, studentScoreRoutes);
app.use(`${API_PREFIX}/thong-tin-tai-chinh`, paymentScoreRoutes);
app.use(`${API_PREFIX}/diem-danh`, attendanceScoreRoutes);
app.use(`${API_PREFIX}/mon-theo-lop`, subjectClassRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "404 NOT FOUND",
    path: req.originalUrl,
  });
});

// Export cho Vercel — KHÔNG listen
export default app;
