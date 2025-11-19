import express from "express";
import { validationResult } from "express-validator";
import {
  listSubjectClasses,
  getSubjects,
  addSubjectClass,
  editSubjectClass,
  removeSubjectClass,
} from "../controllers/subject_class.controllers.js";
import { subjectClassCreateSchema } from "../validations/subject_class.validations.js";
import { authenticate, authorize } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Middleware kiểm tra validation
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  }
  next();
};

router.use(authenticate, authorize("admin", "teacher", "student"));
// Lấy toàn bộ subject_class
router.get("/", listSubjectClasses);

// Lấy môn học theo lớp
router.get("/:classId", getSubjects);

// Tạo quan hệ môn học cho lớp
router.post("/", subjectClassCreateSchema, handleValidation, addSubjectClass);

// Cập nhật môn học lớp
router.put(
  "/:classId",
  subjectClassCreateSchema,
  handleValidation,
  editSubjectClass
);

// Xóa quan hệ môn học của lớp
router.delete("/:classId", removeSubjectClass);

export default router;
