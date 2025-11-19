import { getDB } from "../services/database.services.js";
import { ObjectId } from "mongodb";

const collectionName = "attendance";

// Tạo điểm danh
export async function createAttendance(data) {
  const db = getDB();
  data.student_id = new ObjectId(data.student_id);
  data.subject_id = new ObjectId(data.subject_id);
  data.giao_vien_id = new ObjectId(data.giao_vien_id);
  data.created_at = new Date();
  data.updated_at = new Date();
  return await db.collection(collectionName).insertOne(data);
}

// Lấy điểm danh theo sinh viên
export async function getAttendanceByStudent(studentId) {
  const db = getDB();
  const pipeline = [
    { $match: { student_id: new ObjectId(studentId) } },
    {
      $lookup: {
        from: "subjects",
        localField: "subject_id",
        foreignField: "_id",
        as: "subject_info",
      },
    },
    { $unwind: "$subject_info" },
    {
      $project: {
        _id: 1,
        "subject_info.ten_mon": 1,
        "subject_info.so_tin_chi": 1,
        ngay_hoc: 1,
        trang_thai: 1,
        li_do: 1,
        created_at: 1,
        updated_at: 1,
      },
    },
    { $sort: { ngay_hoc: -1 } },
  ];
  return await db.collection(collectionName).aggregate(pipeline).toArray();
}

// Cập nhật điểm danh
export async function updateAttendance(id, data) {
  const db = getDB();
  data.updated_at = new Date();
  const result = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  return result.matchedCount;
}

// Xóa điểm danh
export async function deleteAttendance(id) {
  const db = getDB();
  const result = await db
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}
