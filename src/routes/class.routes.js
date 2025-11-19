import express from "express";
import ClassController from "../controllers/class.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.middlewares.js";
import { classCreateSchema } from "../validations/class.validations.js";
import { validate } from "../utils/validateResult.js";
import { checkExtraFields } from "../utils/checkExtraFields.js";

const router = express.Router();

// Các field hợp lệ khi tạo hoặc cập nhật
const validFields = [
  "ten_lop",
  "nganh_id",
  "khoa_id",
  "khoa_hoc",
  "co_van_hoc_tap_id",
];

// 👇 Các route dành cho người dùng đã đăng nhập
router.use(authenticate);

router.get("/", authorize(["admin"]), ClassController.getAll);

router.get("/:id", authorize(["admin", "teacher"]), ClassController.getById);

router.get(
  "/:classId/sinh-vien",
  authenticate,
  authorize(["admin", "teacher"]),
  ClassController.getStudentsByClassController
);

// 📌 Lấy lớp theo tên
router.get(
  "/name/:ten_lop",
  authorize(["admin", "teacher"]),
  ClassController.getByName
);

// 📌 Tạo lớp mới
router.post(
  "/",
  authorize(["admin"]),
  checkExtraFields(validFields),
  classCreateSchema,
  validate,
  ClassController.create
);

// 📌 Cập nhật lớp
router.put(
  "/:id",
  authorize(["admin"]),
  checkExtraFields(validFields),
  ClassController.update
);

// 📌 Xóa lớp
// (ít dùng, nhưng vẫn để cho đầy đủ)
router.delete("/:id", authorize(["admin"]), ClassController.delete);

export default router;
