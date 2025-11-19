import { getDB } from "../services/database.services.js";
import { ObjectId } from "mongodb";

const collectionName = "subjects";

/**
 * Lấy tất cả môn học
 */
export async function getAllSubjects() {
  const db = getDB();
  return await db.collection(collectionName).find().toArray();
}

/**
 * Lấy môn học theo ID
 */
export async function getSubjectById(id) {
  const db = getDB();
  return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
}

/**
 * Tạo môn học mới
 */
export async function createSubject(subject) {
  const db = getDB();

  const now = new Date();
  const newSubject = {
    ten_mon: subject.ten_mon,
    so_tin_chi: Number(subject.so_tin_chi),
    nganh_id: new ObjectId(subject.nganh_id),
    mo_ta: subject.mo_ta || "",
    created_at: now,
    updated_at: now,
  };

  const result = await db.collection(collectionName).insertOne(newSubject);
  return result.insertedId.toString();
}

/**
 * Cập nhật môn học
 */
export async function updateSubject(id, data) {
  const db = getDB();

  const updateData = { ...data, updated_at: new Date() };
  if (updateData.nganh_id)
    updateData.nganh_id = new ObjectId(updateData.nganh_id);

  const result = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

  return result.matchedCount;
}

/**
 * Xóa môn học
 */
export async function deleteSubject(id) {
  const db = getDB();
  const result = await db
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}
