import express from "express";
import StudentStudyController from "../controllers/student_study.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.middlewares.js";
import { validate } from "../utils/validateResult.js";
import { checkExtraFields } from "../utils/checkExtraFields.js";
import { StudentStudyCreateSchema } from "../validations/student_study.validations.js";

const router = express.Router();

const validFields = [
  "student_id",
  "class_id",
  "nganh_id",
  "khoa_id",
  "khoa_dao_tao",
  "trang_thai",
];

// router.get("/:id", authenticate, StudentStudyController.getById);
router.get(
  "/:studentId",
  authenticate,
  StudentStudyController.getStudentStudyDetail
);

router.use(authenticate, authorize(["admin", "teacher"]));

router.get("/", StudentStudyController.getAll);
router.post(
  "/",
  checkExtraFields(validFields),
  StudentStudyCreateSchema,
  validate,
  StudentStudyController.create
);
router.put(
  "/:id",
  checkExtraFields(validFields),
  StudentStudyController.update
);
router.delete("/:id", StudentStudyController.delete);

export default router;
