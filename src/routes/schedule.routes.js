import express from "express";
import ScheduleController from "../controllers/schedule.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Lịch học theo lớp
router.get(
  "/lich-theo-lop-hoc/:classId",
  authenticate,
  authorize(["admin", "teacher", "student"]),
  ScheduleController.getByClassId
);

// Lịch dạy của giáo viên
router.get(
  "/xem-lich-day/:teacherId",
  authenticate,
  authorize(["admin", "teacher"]),
  ScheduleController.getClassesByTeacher
);

router.post(
  "/lap-lich",
  authenticate,
  authorize(["admin", "student"]),
  ScheduleController.create
);

export default router;
