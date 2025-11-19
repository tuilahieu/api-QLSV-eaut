## TỔNG QUAN HỆ THỐNG

👥 Người dùng & Phân quyền

users: chứa toàn bộ tài khoản (admin, giáo viên, sinh viên)

roles: định nghĩa loại tài khoản (admin, teacher, student)

🏫 Cấu trúc học tập

khoa: Khoa (ví dụ: Công nghệ thông tin)

nganh: Ngành học (ví dụ: Kỹ thuật phần mềm)

lop_hoc: Lớp học (ví dụ: D20CQCN01)

mon_hoc: Môn học (ví dụ: Cấu trúc dữ liệu)

lich_hoc: Lịch học (gắn với môn + lớp + giáo viên)

lich_thi: Lịch thi (gắn với môn + lớp)

🎓 Sinh viên & Kết quả học tập

diem: lưu điểm của sinh viên theo môn học

diem_danh: lưu thông tin điểm danh

thanh_toan: lưu học phí và các khoản đóng tiền

## CẤU TRÚC CHI TIẾT CÁC COLLECTION

# roles

{
"\_id": ObjectId("..."),
"ten_quyen": "admin" || "teacher" || "student"
}

# users

{
"\_id": ObjectId("..."),
"username": "20222672",
"password": "hashed_password",
"role_id": ObjectId("..."),
"ho_ten": "Trần Văn Hiểu",
"email": "20222672@eaut.edu.vn",
"sdt": "0338022004",
"ngay_sinh": "2004-02-18",
"dia_chi": "Hà Nội",
"gioi_tinh": "Nam",
"ngay_tao": ISODate("2025-01-01T00:00:00Z")
}

# khoa

{
"\_id": ObjectId("..."),
"ma_khoa": "CNTT",
"ten_khoa": "Công nghệ thông tin"
}

# nganh

{
"\_id": ObjectId("..."),
"ma_nganh": "KTPM",
"ten_nganh": "Kỹ thuật phần mềm",
"khoa_id": ObjectId("...") // liên kết khoa
}

# lop_hoc

{
"\_id": ObjectId("..."),
"ma_lop": "D20CQCN01",
"ten_lop": "Công nghệ thông tin 01 - K20",
"nganh_id": ObjectId("..."),
"ptht_id": ObjectId("..."), // phụ trách học tập
"khoa_hoc": "2020-2024"
}

# mon_hoc

{
"\_id": ObjectId("..."),
"ma_mon": "CS101",
"ten_mon": "Nhập môn lập trình",
"so_tin_chi": 3,
"hoc_phi_mon": 2100000
}

# lich_hoc

{
"\_id": ObjectId("..."),
"lop_id": ObjectId("..."),
"mon_id": ObjectId("..."),
"gv_id": ObjectId("..."),
"phong": "A203",
"thu": 2,
"tiet_bat_dau": 1,
"so_tiet": 3,
"ngay_bat_dau": "2025-03-01",
"ngay_ket_thuc": "2025-06-01"
}

# lich_thi

{
"\_id": ObjectId("..."),
"lop_id": ObjectId("..."),
"mon_id": ObjectId("..."),
"phong_thi": "B203",
"ngay_thi": "2025-06-15",
"gio_thi": "07:30",
"hinh_thuc": "Tự luận"
}

# diem

{
"\_id": ObjectId("..."),
"sv_id": ObjectId("..."),
"mon_id": ObjectId("..."),
"diem_qua_trinh": 7.5,
"diem_thi": 8.0,
"diem_tong_ket": 7.8,
"ket_qua": "Đạt",
"hoc_ky": 2,
"nam_hoc": "2024-2025"
}

# diem_danh

{
"\_id": ObjectId("..."),
"sv_id": ObjectId("..."),
"lich_hoc_id": ObjectId("..."),
"ngay_hoc": "2025-04-15",
"trang_thai": "Có mặt" // hoặc "Vắng", "Đi muộn"
}

# thanh_toan

{
"\_id": ObjectId("..."),
"sv_id": ObjectId("..."),
"hoc_ky": 2,
"nam_hoc": "2024-2025",
"mon_hoc": [
{ "mon_id": ObjectId("..."), "ten_mon": "Nhập môn lập trình", "so_tin_chi": 3, "hoc_phi": 1350000 },
{ "mon_id": ObjectId("..."), "ten_mon": "Toán rời rạc", "so_tin_chi": 2, "hoc_phi": 900000 }
],
"tong_tien": 2250000,
"phuong_thuc": "Chuyển khoản",
"trang_thai": "Đã thanh toán",
"ngay_thanh_toan": "2025-01-15"
}

## MỐI QUAN HỆ

| Collection   | Liên kết tới                      | Kiểu               |
| ------------ | --------------------------------- | ------------------ |
| `nganh`      | `khoa`                            | 1-nhiều            |
| `lop_hoc`    | `nganh`, `users(ptht)`            | 1-nhiều            |
| `lich_hoc`   | `lop_hoc`, `mon_hoc`, `users(gv)` | 1-nhiều            |
| `lich_thi`   | `lop_hoc`, `mon_hoc`              | 1-nhiều            |
| `diem`       | `users(sv)`, `mon_hoc`            | 1-nhiều            |
| `diem_danh`  | `users(sv)`, `lich_hoc`           | 1-nhiều            |
| `thanh_toan` | `users(sv)`, `mon_hoc`            | embed / tham chiếu |
