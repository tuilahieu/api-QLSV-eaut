import { checkSchema } from "express-validator";
import { ObjectId } from "mongodb";

export const majorCreateSchema = checkSchema({
  ten_nganh: {
    notEmpty: {
      errorMessage: "Tên chuyên ngành không được để trống.",
    },
  },
  khoa_id: {
    notEmpty: {
      errorMessage: "Chuyên ngành không được bỏ trống",
    },
    custom: {
      options: (value) => ObjectId.isValid(value),
      errorMessage: "ID khoa tham chiếu tới không hợp lệ",
    },
  },
  mo_ta: {
    optional: true,
    notEmpty: {
      errorMessage: "Mô tả chuyên ngành không được để trống.",
    },
  },
});
