import {
  getAllSubjectClasses,
  getSubjectsByClass,
  createSubjectClass,
  updateSubjectClass,
  deleteSubjectClass,
} from "../models/subject_class.models.js";

export async function listSubjectClasses(req, res) {
  try {
    const result = await getAllSubjectClasses();
    res.json({ status: true, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
}

export async function getSubjects(req, res) {
  const { classId } = req.params;
  console.log(classId);
  try {
    const subjects = await getSubjectsByClass(classId);
    res.json({ status: true, data: subjects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
}

export async function addSubjectClass(req, res) {
  try {
    const id = await createSubjectClass(req.body);
    res.json({ status: true, message: "Tạo thành công", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
}

export async function editSubjectClass(req, res) {
  const { classId } = req.params;
  try {
    const matched = await updateSubjectClass(classId, req.body.subjects);
    if (!matched) {
      return res
        .status(404)
        .json({ status: false, message: "Không tìm thấy lớp" });
    }
    res.json({ status: true, message: "Cập nhật thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
}

export async function removeSubjectClass(req, res) {
  const { classId } = req.params;
  try {
    const deleted = await deleteSubjectClass(classId);
    if (!deleted) {
      return res
        .status(404)
        .json({ status: false, message: "Không tìm thấy lớp" });
    }
    res.json({ status: true, message: "Xóa quan hệ môn học thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Lỗi server" });
  }
}
