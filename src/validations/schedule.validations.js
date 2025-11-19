import { checkSchema } from "express-validator";

export const ScheduleCreateSchema = checkSchema({
  subject_id: {
    notEmpty: { errorMessage: "subject_id không được để trống." },
    isMongoId: { errorMessage: "subject_id không hợp lệ." },
  },
  class_id: {
    notEmpty: { errorMessage: "class_id không được để trống." },
    isMongoId: { errorMessage: "class_id không hợp lệ." },
  },
  giao_vien_id: {
    notEmpty: { errorMessage: "giao_vien_id không được để trống." },
    isMongoId: { errorMessage: "giao_vien_id không hợp lệ." },
  },
  loai_lich: {
    notEmpty: { errorMessage: "loai_lich không được để trống." },
    isIn: {
      options: [["hoc", "thi"]],
      errorMessage: "loai_lich chỉ được là 'hoc' hoặc 'thi'.",
    },
  },
  thu: {
    notEmpty: { errorMessage: "thu không được để trống." },
    custom: {
      options: (value) => {
        if (!Array.isArray(value)) throw new Error("thu phải là mảng.");
        if (!value.every((n) => Number.isInteger(n) && n >= 2 && n <= 8))
          throw new Error("Các giá trị trong thu phải là số nguyên từ 2 đến 8");
        return true;
      },
    },
  },
  ngay: {
    notEmpty: { errorMessage: "ngay không được để trống." },
    isISO8601: { errorMessage: "ngay phải là ngày hợp lệ (ISO8601)." },
  },
  tiet_bat_dau: {
    notEmpty: { errorMessage: "tiet_bat_dau không được để trống." },
    isInt: {
      options: { min: 1 },
      errorMessage: "tiet_bat_dau phải là số nguyên >= 1.",
    },
  },
  tiet_ket_thuc: {
    notEmpty: { errorMessage: "tiet_ket_thuc không được để trống." },
    isInt: {
      options: { min: 1 },
      errorMessage: "tiet_ket_thuc phải là số nguyên >= 1.",
    },
    custom: {
      options: (value, { req }) => {
        if (parseInt(value) < parseInt(req.body.tiet_bat_dau)) {
          throw new Error("tiet_ket_thuc phải lớn hơn tiet_bat_dau.");
        }
        return true;
      },
    },
  },
  phong_hoc: {
    notEmpty: { errorMessage: "phong_hoc không được để trống." },
    isString: { errorMessage: "phong_hoc phải là chuỗi ký tự." },
  },
  ghi_chu: {
    optional: true,
    isString: { errorMessage: "ghi_chu phải là chuỗi ký tự nếu có." },
  },
});
