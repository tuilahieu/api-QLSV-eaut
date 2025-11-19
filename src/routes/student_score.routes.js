import express from "express";
import * as StudentScoreController from "../controllers/student_score.controllers.js";
import { StudentScoreCreateSchema } from "../validations/student_score.validations.js";
import { validate } from "../utils/validateResult.js";
import { authenticate, authorize } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Tạo điểm
router.get(
  "/:studentId",
  authenticate,
  authorize(["admin", "teacher", "student"]),
  StudentScoreController.getByStudent
);

router.use(authenticate, authorize(["admin", "teacher"]));

router.post(
  "/",
  StudentScoreCreateSchema,
  validate,
  StudentScoreController.create
);

router.put(
  "/:id",
  StudentScoreCreateSchema,
  validate,
  StudentScoreController.update
);

router.delete("/:id", StudentScoreController.remove);

export default router;
