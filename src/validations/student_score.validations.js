import { checkSchema } from "express-validator";

export const StudentScoreCreateSchema = checkSchema({
  student_id: {
    notEmpty: { errorMessage: "student_id không được để trống" },
    isMongoId: { errorMessage: "student_id không hợp lệ" },
  },
  subject_id: {
    notEmpty: { errorMessage: "subject_id không được để trống" },
    isMongoId: { errorMessage: "subject_id không hợp lệ" },
  },
  diem_chuyen_can: {
    notEmpty: { errorMessage: "diem_chuyen_can không được để trống" },
    isFloat: {
      options: { min: 0, max: 10 },
      errorMessage: "diem_chuyen_can phải nằm trong khoảng 0-10",
    },
  },
  diem_giua_ky: {
    notEmpty: { errorMessage: "diem_giua_ky không được để trống" },
    isFloat: {
      options: { min: 0, max: 10 },
      errorMessage: "diem_giua_ky phải nằm trong khoảng 0-10",
    },
  },
  diem_cuoi_ky: {
    optional: true,
    notEmpty: { errorMessage: "diem_cuoi_ky không được để trống" },
    isFloat: {
      options: { min: 0, max: 10 },
      errorMessage: "diem_cuoi_ky phải nằm trong khoảng 0-10",
    },
  },
  diem_tong: {
    optional: true,
    isFloat: {
      options: { min: 0, max: 10 },
      errorMessage: "diem_tong phải nằm trong khoảng 0-10",
    },
  },
});
