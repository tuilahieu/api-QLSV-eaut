import { checkSchema } from "express-validator";
import { ObjectId } from "mongodb";

export const subjectClassCreateSchema = checkSchema({
  class_id: {
    notEmpty: {
      errorMessage: "class_id không được để trống.",
    },
    custom: {
      options: (value) => ObjectId.isValid(value),
      errorMessage: "class_id không hợp lệ (phải là ObjectId hợp lệ).",
    },
  },

  array_subject_id: {
    notEmpty: {
      errorMessage: "array_subject_id không được để trống.",
    },
    isArray: {
      errorMessage: "array_subject_id phải là một mảng.",
    },
  },

  "array_subject_id.*": {
    custom: {
      options: (value) => ObjectId.isValid(value),
      errorMessage:
        "Mỗi phần tử trong array_subject_id phải là ObjectId hợp lệ.",
    },
  },

  hoc_ky: {
    notEmpty: {
      errorMessage: "hoc_ky không được để trống.",
    },
    isInt: {
      options: { min: 1 },
      errorMessage: "hoc_ky phải là số nguyên >= 1.",
    },
  },
});
