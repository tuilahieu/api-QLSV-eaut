import * as Attendance from "../models/attendance.models.js";

class AttendanceController {
  async create(req, res) {
    try {
      const id = await Attendance.createAttendance(req.body);
      res.status(201).json({ status: true, id: id.insertedId });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async getByStudent(req, res) {
    try {
      const data = await Attendance.getAttendanceByStudent(
        req.params.studentId
      );
      res.json({ status: true, data });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async update(req, res) {
    try {
      const matched = await Attendance.updateAttendance(
        req.params.id,
        req.body
      );
      if (!matched)
        return res
          .status(404)
          .json({ status: false, message: "Không tìm thấy điểm danh." });
      res.json({ status: true, message: "Cập nhật thành công!" });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await Attendance.deleteAttendance(req.params.id);
      if (!deleted)
        return res
          .status(404)
          .json({ status: false, message: "Không tìm thấy điểm danh." });
      res.json({ status: true, message: "Xóa thành công!" });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
}

export default new AttendanceController();
