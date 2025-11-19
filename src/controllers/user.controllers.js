import * as User from "../models/user.models.js";

export async function getAll(req, res) {
  try {
    // console.log(req.query);
    const { role, lop_hoc_id } = req.query;
    const users = await User.getAllUsers(role, lop_hoc_id);
    res.json({
      status: true,
      data: users,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    res.status(500).json({ status: false, error: error.message });
  }
}

export async function getByUsername(req, res) {
  const userUsername = req.params.username;
  try {
    const user = await User.getUserByUsername(userUsername);

    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "Không có người dùng này." });

    res.json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}

export async function create(req, res) {
  try {
    const isExistUser = await User.getUserByUsername(req.body.username);
    if (isExistUser) {
      return res.json({ status: false, message: "Người dùng đã tồn tại." });
    }
    const id = await User.createUser(req.body);
    res.json({
      status: true,
      message: "Tạo thành công người dùng.",
      id: id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
}

export async function update(req, res) {
  try {
    if (!req.body) {
      return res.json({ status: false, message: "Không có dữ liệu đầu vào." });
    }

    if (Object.entries(req.body).length === 0) {
      return res.json({
        status: false,
        message: "Không có trường nào thay đổi.",
      });
    }
    const matched = await User.updateUser(req.params.id, req.body);
    if (!matched)
      return res
        .status(404)
        .json({ status: false, message: "Không có người dùng này." });
    res.json({
      status: true,
      message: "Cập nhật thành công !!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error: error.message });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await User.deleteStudent(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ status: false, message: "Không tìm thấy sinh viên này." });
    res.json({ status: true, message: "Xóa thành công sinh viên." });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}
