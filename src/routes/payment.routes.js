import express from "express";
import PaymentController from "../controllers/payment.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.middlewares.js";
import { validate } from "../utils/validateResult.js";
import { checkExtraFields } from "../utils/checkExtraFields.js";
import { PaymentCreateSchema } from "../validations/payment.validations.js";

const router = express.Router();

// Các trường hợp hợp lệ để validate
const validFields = [
  "student_id",
  "subject_id",
  "so_tien",
  "phuong_thuc",
  "ma_giao_dich",
  "trang_thai",
  "ngay_thanh_toan",
  "dich_vu",
];

// Tất cả route đều cần login
router.use(authenticate);

router.get(
  "/:studentId",
  authenticate,
  authorize(["student", "admin"]),
  PaymentController.getPaymentsForStudent
);

// Admin / Hiệu trưởng mới có quyền tạo, cập nhật, xóa
router.use(authorize(["admin"]));

// Tạo thanh toán
router.post(
  "/",
  checkExtraFields(validFields),
  PaymentCreateSchema,
  validate,
  PaymentController.create
);

// Cập nhật thanh toán
router.put(
  "/:id",
  checkExtraFields(validFields),
  PaymentCreateSchema,
  validate,
  PaymentController.update
);

// Xóa thanh toán
router.delete("/:id", PaymentController.remove);

export default router;
