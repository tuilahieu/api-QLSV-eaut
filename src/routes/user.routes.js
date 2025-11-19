import express from "express";
import { body } from "express-validator";
import * as UserController from "../controllers/user.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.middlewares.js";
import { userCreateSchema } from "../validations/user.validations.js";
import { validate } from "../utils/validateResult.js";
import { checkExtraFields } from "../utils/checkExtraFields.js";

const router = express.Router();

const validFields = [
  "username",
  "password",
  "role",
  "ho_ten",
  "email",
  "sdt",
  "ngay_sinh",
  "dia_chi",
  "gioi_tinh",
];

router.use(authenticate);
// only student can access

// admin can access with middleware *authorize*
router.get("/", authorize(["admin"]), UserController.getAll);
router.get(
  "/:username",
  authorize(["admin", "student", "teacher"]),
  UserController.getByUsername
);
router.post(
  "/",
  authorize(["admin"]),
  checkExtraFields(validFields),
  userCreateSchema,
  validate,
  UserController.create
);
router.put(
  "/:id",
  authorize(["admin"]),
  checkExtraFields(validFields),
  UserController.update
);
router.delete("/:id", authorize(["cant not remove"]), UserController.remove);

export default router;
