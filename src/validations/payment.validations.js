import { checkSchema } from "express-validator";

export const PaymentCreateSchema = checkSchema({
  student_id: {
    notEmpty: { errorMessage: "student_id không được để trống." },
    isMongoId: { errorMessage: "student_id không hợp lệ." },
  },
  subject_id: {
    optional: true,
    isMongoId: { errorMessage: "subject_id không hợp lệ." },
  },
  so_tien: {
    notEmpty: { errorMessage: "so_tien không được để trống." },
    isFloat: { options: { min: 0 }, errorMessage: "so_tien phải >= 0" },
  },
  phuong_thuc: {
    notEmpty: { errorMessage: "phuong_thuc không được để trống." },
  },
  dich_vu: {
    notEmpty: { errorMessage: "dich_vu không được để trống." },
  },
});
