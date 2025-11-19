import { checkSchema } from "express-validator";
import { ObjectId } from "mongodb";

export const classCreateSchema = checkSchema({
  ten_lop: {
    notEmpty: {
      errorMessage: "Tên lớp (ten_lop) không được để trống.",
    },
    isString: {
      errorMessage: "Tên lớp phải là chuỗi ký tự.",
    },
  },

  khoa_id: {
    notEmpty: {
      errorMessage: "khoa_id không được để trống.",
    },
    custom: {
      options: (value) => ObjectId.isValid(value),
      errorMessage: "khoa_id không hợp lệ (phải là ObjectId hợp lệ).",
    },
  },

  nganh_id: {
    notEmpty: {
      errorMessage: "nganh_id không được để trống.",
    },
    custom: {
      options: (value) => ObjectId.isValid(value),
      errorMessage: "nganh_id không hợp lệ (phải là ObjectId hợp lệ).",
    },
  },

  co_van_hoc_tap_id: {
    notEmpty: {
      errorMessage: "co_van_hoc_tap_id không được để trống.",
    },
    custom: {
      options: (value) => ObjectId.isValid(value),
      errorMessage: "co_van_hoc_tap_id không hợp lệ (phải là ObjectId hợp lệ).",
    },
  },

  khoa_hoc: {
    notEmpty: {
      errorMessage: "Khóa học (khoa_hoc) không được để trống.",
    },
    isString: {
      errorMessage:
        "Khóa học (khoa_hoc) phải là chuỗi ký tự (VD: 2022, 2023...).",
    },
  },
});
