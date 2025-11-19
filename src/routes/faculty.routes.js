import express from "express";
import FacultyController from "../controllers/faculty.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.middlewares.js";
import { facultyCreateSchema } from "../validations/faculty.validations.js";
import { validate } from "../utils/validateResult.js";
import { checkExtraFields } from "../utils/checkExtraFields.js";

const router = express.Router();

const validFields = ["ten_khoa", "mo_ta"];

router.get("/:id", authenticate, FacultyController.getById);
router.get("/", FacultyController.getAll);

router.use(authenticate, authorize(["admin"]));
router.post(
  "/",
  checkExtraFields(validFields),
  facultyCreateSchema,
  validate,
  FacultyController.create
);
router.put("/:id", checkExtraFields(validFields), FacultyController.update);
router.delete("/:id", FacultyController.delete);

export default router;
