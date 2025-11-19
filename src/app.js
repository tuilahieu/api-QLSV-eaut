import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  connectDB,
  getDB,
  disconnectDB,
} from "./services/database.services.js";

import authRoutes from "./routes/auth.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import majorRoutes from "./routes/major.routes.js";
import userRoutes from "./routes/user.routes.js";
import classRoutes from "./routes/class.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import studentStudyRoutes from "./routes/student_study.routes.js";
import studentScoreRoutes from "./routes/student_score.routes.js";
import paymentScoreRoutes from "./routes/payment.routes.js";
import attendanceScoreRoutes from "./routes/attendance.routes.js";
import subjectClassRoutes from "./routes/subject_class.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
if (process.env.DEV_MODE) {
  app.use(cors());
} else {
  app.use(
    cors({
      origin: process.env.DOMAIN_ALLOWED.split(","),
    })
  );
}
const port = process.env.PORT || 3000;

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

app.use((req, res) => {
  res.status(404).json({
    message: "404 NOT FOUND",
    path: req.originalUrl,
  });
});

connectDB().then(async () => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

process.on("SIGINT", async () => {
  console.log("\n🧹 Closing MongoDB connection...");
  disconnectDB();
  console.log("MongoDB disconnected");
  process.exit(0);
});
