import { checkSchema } from "express-validator";

export const userCreateSchema = checkSchema({
  username: {
    notEmpty: {
      errorMessage: "Tên đăng nhập (username) không được để trống.",
    },
    isString: {
      errorMessage: "Tên đăng nhập phải là chuỗi.",
    },
  },

  password: {
    notEmpty: {
      errorMessage: "Mật khẩu không được để trống.",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Mật khẩu cần ít nhất 6 ký tự.",
    },
  },

  role: {
    notEmpty: {
      errorMessage: "Vai trò (role) không được để trống.",
    },
    isIn: {
      options: [["admin", "teacher", "student"]],
      errorMessage: "Role chỉ được là 'admin', 'teacher' hoặc 'student'.",
    },
  },

  ho_ten: {
    notEmpty: {
      errorMessage: "Họ tên không được để trống.",
    },
    isString: {
      errorMessage: "Họ tên phải là chuỗi ký tự.",
    },
  },

  email: {
    notEmpty: {
      errorMessage: "Email không được để trống.",
    },
    isEmail: {
      errorMessage: "Sai định dạng email.",
    },
  },

  sdt: {
    notEmpty: {
      errorMessage: "Số điện thoại không được để trống.",
    },
    matches: {
      options: [/^(0|\+84)[0-9]{9}$/],
      errorMessage:
        "Số điện thoại không hợp lệ (VD: 0338022004 hoặc +84938022004).",
    },
  },

  ngay_sinh: {
    notEmpty: {
      errorMessage: "Ngày sinh không được để trống.",
    },
    isISO8601: {
      errorMessage: "Ngày sinh sai định dạng. Dạng đúng: YYYY-MM-DD",
    },
  },

  dia_chi: {
    notEmpty: {
      errorMessage: "Địa chỉ không được để trống.",
    },
    isString: {
      errorMessage: "Địa chỉ phải là chuỗi ký tự.",
    },
  },

  gioi_tinh: {
    notEmpty: {
      errorMessage: "Giới tính không được để trống.",
    },
    isIn: {
      options: [["Nam", "Nữ"]],
      errorMessage: "Giới tính chỉ được là 'Nam' hoặc 'Nữ'.",
    },
  },
});
