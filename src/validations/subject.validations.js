import { checkSchema } from "express-validator";
import { ObjectId } from "mongodb";

export const SubjectCreateSchema = checkSchema({
  ten_mon: {
    notEmpty: {
      errorMessage: "Tên môn học không được để trống",
    },
    isString: {
      errorMessage: "Tên môn học phải là chuỗi ký tự",
    },
  },
  so_tin_chi: {
    notEmpty: {
      errorMessage: "Số tín chỉ không được để trống",
    },
    isInt: {
      errorMessage: "Số tín chỉ phải là số nguyên",
    },
    toInt: true,
  },
  nganh_id: {
    notEmpty: {
      errorMessage: "Ngành học không được để trống",
    },
    custom: {
      options: (value) => ObjectId.isValid(value),
      errorMessage: "nganh_id không hợp lệ",
    },
  },
  mo_ta: {
    optional: true,
    isString: {
      errorMessage: "Mô tả môn học phải là chuỗi ký tự",
    },
  },
});
