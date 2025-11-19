import { checkSchema } from "express-validator";

export const StudentStudyCreateSchema = checkSchema({
  student_id: {
    notEmpty: { errorMessage: "student_id không được để trống." },
    isMongoId: { errorMessage: "student_id không hợp lệ." },
  },
  class_id: {
    notEmpty: { errorMessage: "class_id không được để trống." },
    isMongoId: { errorMessage: "class_id không hợp lệ." },
  },
  nganh_id: {
    notEmpty: { errorMessage: "nganh_id không được để trống." },
    isMongoId: { errorMessage: "nganh_id không hợp lệ." },
  },
  khoa_id: {
    notEmpty: { errorMessage: "khoa_id không được để trống." },
    isMongoId: { errorMessage: "khoa_id không hợp lệ." },
  },
  khoa_dao_tao: {
    notEmpty: { errorMessage: "khoa_dao_tao không được để trống." },
    isString: { errorMessage: "khoa_dao_tao phải là chuỗi." },
  },
  trang_thai: {
    notEmpty: { errorMessage: "trang_thai không được để trống." },
    isIn: {
      options: [["Đang học", "Tạm dừng", "Đã tốt nghiệp", "Bảo lưu"]],
      errorMessage:
        "trang_thai phải là một trong: Đang học, Tạm dừng, Đã tốt nghiệp, Bảo lưu.",
    },
  },
});
