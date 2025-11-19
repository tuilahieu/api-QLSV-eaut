import * as Classes from "../models/class.models.js";

class ClassesController {
  // 📌 Lấy danh sách tất cả lớp
  async getAll(req, res) {
    try {
      const classes = await Classes.getAllClasses();
      res.json({ status: true, data: classes });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  // 📌 Lấy lớp theo ID
  async getById(req, res) {
    try {
      const classData = await Classes.getClassById(req.params.id);
      if (!classData) {
        return res
          .status(404)
          .json({ status: false, message: "Không tìm thấy lớp này." });
      }
      res.json({ status: true, data: classData });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async getStudentsByClassController(req, res) {
    const classId = req.params.classId;
    // console.log(classId);
    try {
      const students = await Classes.getStudentsByClass(classId);
      res.json({ status: true, data: students });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: "Lỗi server" });
    }
  }
  // 📌 Tìm lớp theo tên lớp
  async getByName(req, res) {
    try {
      const classData = await Classes.getClassByName(req.params.ten_lop);
      if (!classData) {
        return res
          .status(404)
          .json({ status: false, message: "Không tìm thấy lớp này." });
      }
      res.json({ status: true, data: classData });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  // 📌 Tạo lớp mới
  async create(req, res) {
    try {
      const { ten_lop } = req.body;

      // Kiểm tra tên lớp đã tồn tại
      const existed = await Classes.getClassByName(ten_lop);
      if (existed) {
        return res.status(409).json({
          status: false,
          message: `Lớp ${ten_lop} đã tồn tại.`,
        });
      }

      const newClassId = await Classes.createClass(req.body);
      res.status(201).json({
        status: true,
        message: "Tạo lớp thành công.",
        id: newClassId,
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  // 📌 Cập nhật lớp học
  async update(req, res) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          status: false,
          message: "Không có dữ liệu cần cập nhật.",
        });
      }

      const matched = await Classes.updateClass(req.params.id, req.body);
      if (!matched) {
        return res
          .status(404)
          .json({ status: false, message: "Không tồn tại lớp này." });
      }

      res.json({ status: true, message: "Cập nhật thành công." });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  // 📌 Xóa lớp học
  async delete(req, res) {
    try {
      const deleted = await Classes.deleteClass(req.params.id);
      if (!deleted) {
        return res
          .status(404)
          .json({ status: false, message: "Không tồn tại lớp này." });
      }

      res.json({ status: true, message: "Xóa lớp thành công." });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
}

export default new ClassesController();
