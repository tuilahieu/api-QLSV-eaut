import { checkSchema } from "express-validator";

export const facultyCreateSchema = checkSchema({
  ten_khoa: {
    notEmpty: {
      errorMessage: "Tên khoa không được để trống.",
    },
  },
  mo_ta: {
    optional: true,
    notEmpty: {
      errorMessage: "Mô tả khoa không được để trống.",
    },
  },
});
