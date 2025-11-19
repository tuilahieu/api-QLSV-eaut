import express from "express";
import AttendanceController from "../controllers/attendance.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.middlewares.js";
import { AttendanceCreateSchema } from "../validations/attendance.validations.js";
import { validate } from "../utils/validateResult.js";

const router = express.Router();

router.use(authenticate);

// Chỉ giáo viên hoặc admin mới được tạo/xóa/cập nhật điểm danh
router.use(authorize(["admin", "teacher"]));

// Tạo điểm danh
router.post("/", AttendanceCreateSchema, validate, AttendanceController.create);

// Lấy điểm danh theo sinh viên
router.get("/:studentId", AttendanceController.getByStudent);

// Cập nhật điểm danh
router.put("/:id", AttendanceController.update);

// Xóa điểm danh
router.delete("/:id", AttendanceController.delete);

export default router;
