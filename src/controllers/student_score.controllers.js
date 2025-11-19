import * as StudentScore from "../models/student_score.models.js";

export async function create(req, res) {
  try {
    const result = await StudentScore.createStudentScore(req.body);
    res.status(201).json({
      status: true,
      message: "Thêm điểm thành công",
      id: result.insertedId,
    });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
}

export async function getByStudent(req, res) {
  try {
    const { studentId } = req.params;
    console.log(studentId);
    const result = await StudentScore.getStudentScores(studentId);
    res.json({ status: true, data: result });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    await StudentScore.updateStudentScore(id, req.body);
    res.json({ status: true, message: "Cập nhật điểm thành công" });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;
    await StudentScore.deleteStudentScore(id);
    res.json({ status: true, message: "Xoá điểm thành công" });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
}
