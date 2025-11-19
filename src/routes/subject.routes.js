import express from "express";
import SubjectController from "../controllers/subject.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.middlewares.js";
import { validate } from "../utils/validateResult.js";
import { checkExtraFields } from "../utils/checkExtraFields.js";
import { SubjectCreateSchema } from "../validations/subject.validations.js";

const router = express.Router();

// Các field hợp lệ theo model mới
const validFields = ["ten_mon", "so_tin_chi", "nganh_id", "mo_ta"];

// Lấy môn học theo ID (tất cả user đều có thể xem)
router.get("/:id", authenticate, SubjectController.getById);

// Các route quản lý môn học cần quyền admin (admin)
router.use(authenticate, authorize(["admin"]));

router.get("/", SubjectController.getAll);

router.post(
  "/",
  checkExtraFields(validFields),
  SubjectCreateSchema,
  validate,
  SubjectController.create
);

router.put(
  "/:id",
  checkExtraFields(validFields),
  // SubjectCreateSchema,
  validate,
  SubjectController.update
);

router.delete("/:id", SubjectController.delete);

export default router;
