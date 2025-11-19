import * as Subjects from "../models/subject.models.js";

class SubjectController {
  // Lấy tất cả môn học
  async getAll(req, res) {
    try {
      const subjects = await Subjects.getAllSubjects();
      res.json({ status: true, data: subjects });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  // Lấy môn học theo ID
  async getById(req, res) {
    try {
      const subject = await Subjects.getSubjectById(req.params.id);
      if (!subject) {
        return res
          .status(404)
          .json({ status: false, message: "Không tồn tại môn học này." });
      }
      res.json({ status: true, data: subject });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  // Tạo môn học mới
  async create(req, res) {
    try {
      // Kiểm tra trùng tên môn học trong DB
      const isExist = await Subjects.getAllSubjects(); // Hoặc tạo hàm getSubjectByName nếu muốn tìm nhanh
      if (isExist.some((s) => s.ten_mon === req.body.ten_mon)) {
        return res.status(400).json({
          status: false,
          message: "Tên môn học '" + req.body.ten_mon + "' đã tồn tại.",
        });
      }

      const newSubjectId = await Subjects.createSubject(req.body);
      res.status(201).json({ status: true, id: newSubjectId });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  // Cập nhật môn học
  async update(req, res) {
    try {
      if (!req.body || Object.entries(req.body).length === 0) {
        return res.json({
          status: false,
          message: "Không có dữ liệu đầu vào hoặc trường nào thay đổi.",
        });
      }

      const matched = await Subjects.updateSubject(req.params.id, req.body);
      if (!matched) {
        return res
          .status(404)
          .json({ status: false, message: "Không tồn tại môn học này." });
      }

      res.json({ status: true, message: "Cập nhật thành công!" });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  // Xóa môn học
  async delete(req, res) {
    try {
      const deleted = await Subjects.deleteSubject(req.params.id);
      if (!deleted) {
        return res
          .status(404)
          .json({ status: false, message: "Không tồn tại môn học này." });
      }
      res.json({ status: true, message: "Xóa thành công!" });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
}

export default new SubjectController();
