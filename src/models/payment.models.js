import { getDB } from "../services/database.services.js";
import { ObjectId } from "mongodb";

const collectionName = "payments";

export async function createPayment(data) {
  const db = getDB();
  data.created_at = new Date();
  data.updated_at = new Date();
  data.student_id = new ObjectId(data.student_id);
  data.trang_thai = "pending";
  const timestamp = Date.now();
  data.ma_giao_dich = `EAUT-${timestamp}`.toUpperCase();
  if (data.subject_id) data.subject_id = new ObjectId(data.subject_id);
  const result = await db.collection(collectionName).insertOne(data);
  return result.insertedId.toString();
}

export async function getPaymentsByStudent(studentId) {
  const db = getDB();
  return await db
    .collection(collectionName)
    .find({ student_id: new ObjectId(studentId) })
    .toArray();
}

export async function updatePaymentStatus(paymentId, status) {
  const db = getDB();
  const result = await db
    .collection(collectionName)
    .updateOne(
      { _id: new ObjectId(paymentId) },
      { $set: { trang_thai: status, updated_at: new Date() } }
    );
  return result.matchedCount > 0;
}
