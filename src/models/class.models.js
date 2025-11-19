import { getDB } from "../services/database.services.js";
import { ObjectId } from "mongodb";

const collectionName = "classes";

// 📌 Lấy toàn bộ danh sách lớp
export async function getAllClasses() {
  const db = getDB();
  return await db.collection(collectionName).find().toArray();
}
export async function getStudentsByClass(classId) {
  const db = getDB();

  try {
    // 1️⃣ Lấy tất cả studentStudy của lớp
    const studentStudies = await db
      .collection("student_study")
      .find({ class_id: new ObjectId(classId) })
      .toArray();

    // if (!studentStudies.length) return [];

    // 2️⃣ Lấy tất cả student_id
    const studentIds = studentStudies.map((s) => new ObjectId(s.student_id));

    // 3️⃣ Lấy thông tin người dùng từ users
    const students = await db
      .collection("users")
      .find({ _id: { $in: studentIds } }, { projection: { password: 0 } })
      .toArray();

    return students;
  } catch (err) {
    console.error("Lỗi khi lấy sinh viên theo lớp:", err);
    throw err;
  }
}
// 📌 Lấy lớp theo ID
export async function getClassById(id) {
  const db = getDB();
  return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
}

// 📌 Tìm lớp theo tên lớp
export async function getClassByName(ten_lop) {
  const db = getDB();
  return await db.collection(collectionName).findOne({ ten_lop });
}

// 📌 Tạo lớp mới
export async function createClass(data) {
  const db = getDB();

  const newClass = {
    ten_lop: data.ten_lop,
    khoa_id: new ObjectId(data.khoa_id),
    nganh_id: new ObjectId(data.nganh_id),
    co_van_hoc_tap_id: new ObjectId(data.co_van_hoc_tap_id),
    khoa_hoc: data.khoa_hoc,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const result = await db.collection(collectionName).insertOne(newClass);
  return result.insertedId.toString();
}

// 📌 Cập nhật lớp học
export async function updateClass(id, data) {
  const db = getDB();
  const updateData = { ...data, updated_at: new Date() };

  // Chuyển đổi các ID sang ObjectId nếu có
  ["khoa_id", "nganh_id", "co_van_hoc_tap_id"].forEach((key) => {
    if (updateData[key]) updateData[key] = new ObjectId(updateData[key]);
  });

  const result = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  return result.matchedCount;
}

// 📌 Xóa lớp học
export async function deleteClass(id) {
  const db = getDB();
  const result = await db
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount;
}
