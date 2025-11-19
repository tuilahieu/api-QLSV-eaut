import { getDB } from "../services/database.services.js";
import { ObjectId } from "mongodb";

const collectionName = "subject_class";

// 📌 Lấy tất cả quan hệ môn học của các lớp
export async function getAllSubjectClasses() {
  const db = getDB();
  return await db.collection(collectionName).find().toArray();
}

// 📌 Lấy môn học theo class_id
export async function getSubjectsByClass(classId) {
  const db = getDB();

  try {
    const subjectClass = await db
      .collection(collectionName)
      .findOne({ class_id: new ObjectId(classId) });

    // console.log("model " + subjectClass.array_subject_id);
    return subjectClass ? subjectClass.array_subject_id : [];
  } catch (err) {
    console.error("Lỗi khi lấy môn học theo lớp:", err);
    throw err;
  }
}

// 📌 Tạo quan hệ môn học cho lớp
export async function createSubjectClass(data) {
  const db = getDB();
  const collection = db.collection(collectionName);

  // kiểm tra dữ liệu đầu vào
  if (!Array.isArray(data.array_subject_id)) {
    throw new Error("array_subject_id phải là một mảng");
  }

  const doc = {
    class_id: new ObjectId(data.class_id),
    array_subject_id: data.array_subject_id.map((id) => new ObjectId(id)),
    hoc_ky: Number(data.hoc_ky),
    created_at: new Date(),
    updated_at: new Date(),
  };

  const result = await collection.insertOne(doc);
  return result.insertedId;
}

// 📌 Cập nhật môn học của lớp
export async function updateSubjectClass(classId, subjects) {
  const db = getDB();

  const updateData = {
    subjects: subjects.map((s) => ({
      subject_id: new ObjectId(s.subject_id),
      ten_mon: s.ten_mon,
      so_tin_chi: s.so_tin_chi,
    })),
    updated_at: new Date(),
  };

  const result = await db
    .collection(collectionName)
    .updateOne({ class_id: new ObjectId(classId) }, { $set: updateData });

  return result.matchedCount;
}

// 📌 Xóa quan hệ môn học của lớp
export async function deleteSubjectClass(classId) {
  const db = getDB();
  const result = await db
    .collection(collectionName)
    .deleteOne({ class_id: new ObjectId(classId) });

  return result.deletedCount;
}
