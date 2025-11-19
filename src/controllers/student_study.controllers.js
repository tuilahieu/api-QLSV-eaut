import * as StudentStudy from "../models/student_study.models.js";

class StudentStudyController {
  async getAll(req, res) {
    try {
      const list = await StudentStudy.getAllStudentStudies();
      res.json({ status: true, data: list });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async getStudentStudyDetail(req, res) {
    try {
      const { studentId } = req.params;
      // const { classId } = req.query;

      if (!studentId) {
        return res.status(400).json({
          status: false,
          message: "Thiếu studentId",
        });
      }

      const result = await StudentStudy.getStudentStudyByStudentAndClass(
        studentId
      );

      if (!result.length) {
        return res.status(404).json({
          status: false,
          message: "Không tìm thấy dữ liệu học tập của sinh viên trong lớp này",
        });
      }

      res.json({ status: true, data: result[0] });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const data = await StudentStudy.getStudentStudyById(req.params.id);
      if (!data)
        return res
          .status(404)
          .json({ status: false, message: "Không tìm thấy bản ghi." });
      res.json({ status: true, data });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async create(req, res) {
    try {
      const newId = await StudentStudy.createStudentStudy(req.body);
      res.status(201).json({ status: true, id: newId });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async update(req, res) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.json({
          status: false,
          message: "Không có dữ liệu để cập nhật.",
        });
      }
      const matched = await StudentStudy.updateStudentStudy(
        req.params.id,
        req.body
      );
      if (!matched)
        return res
          .status(404)
          .json({ status: false, message: "Không tồn tại bản ghi này." });
      res.json({ status: true, message: "Đã cập nhật thành công!" });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await StudentStudy.deleteStudentStudy(req.params.id);
      if (!deleted)
        return res
          .status(404)
          .json({ status: false, message: "Không có bản ghi này." });
      res.json({ status: true, message: "Xóa thành công!" });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
}

export default new StudentStudyController();
