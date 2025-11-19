import * as Schedules from "../models/schedule.models.js";

class ScheduleController {
  async getByClassId(req, res) {
    // console.log(req.params.classId);
    try {
      const schedules = await Schedules.getSchedulesWithDetailsByClassId(
        req.params.classId
      );
      // console.log(schedules);
      res.json({ status: true, data: schedules });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async getClassesByTeacher(req, res) {
    try {
      const teacherId = req.params.teacherId;
      const classes = await Schedules.getClassesByTeacher(teacherId);
      res.json({ status: true, data: classes });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async create(req, res) {
    try {
      const newScheduleId = await Schedules.createSchedule(req.body);
      res.status(201).json({
        status: true,
        id: newScheduleId,
        message: "Thêm lịch học thành công!",
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async update(req, res) {
    try {
      if (!req.body || Object.entries(req.body).length === 0) {
        return res.status(400).json({
          status: false,
          message: "Không có dữ liệu để cập nhật.",
        });
      }

      const matched = await Schedules.updateSchedule(req.params.id, req.body);
      if (!matched) {
        return res
          .status(404)
          .json({ status: false, message: "Không tồn tại lịch học này." });
      }

      res.json({ status: true, message: "Đã cập nhật lịch học thành công!" });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await Schedules.deleteSchedule(req.params.id);
      if (!deleted) {
        return res
          .status(404)
          .json({ status: false, message: "Không có lịch học này." });
      }

      res.json({ status: true, message: "Đã xóa lịch học thành công!" });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
}

export default new ScheduleController();
