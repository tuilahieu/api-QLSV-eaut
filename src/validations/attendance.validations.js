import { checkSchema } from "express-validator";

export const AttendanceCreateSchema = checkSchema({
  student_id: {
    notEmpty: { errorMessage: "student_id không được để trống." },
    isMongoId: { errorMessage: "student_id không hợp lệ." },
  },
  subject_id: {
    notEmpty: { errorMessage: "subject_id không được để trống." },
    isMongoId: { errorMessage: "subject_id không hợp lệ." },
  },
  giao_vien_id: {
    notEmpty: { errorMessage: "giao_vien_id không được để trống." },
    isMongoId: { errorMessage: "giao_vien_id không hợp lệ." },
  },
  ngay_hoc: {
    notEmpty: { errorMessage: "ngay_hoc không được để trống." },
    isISO8601: { errorMessage: "ngay_hoc phải là ngày hợp lệ." },
  },
  trang_thai: {
    notEmpty: { errorMessage: "trang_thai không được để trống." },
    isIn: {
      options: [["co_mat", "vang", "muon", "nghi_phep"]],
      errorMessage: "trang_thai không hợp lệ.",
    },
  },
  li_do: {
    optional: true,
    isString: { errorMessage: "li_do phải là chuỗi nếu có." },
  },
});
