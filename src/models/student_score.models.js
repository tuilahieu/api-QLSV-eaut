import { getDB } from "../services/database.services.js";
import { ObjectId } from "mongodb";

const collectionName = "student_score";

export async function createStudentScore(data) {
  const db = getDB();

  data.student_id = new ObjectId(data.student_id);
  data.subject_id = new ObjectId(data.subject_id);
  data.diem_cuoi_ky = data.diem_cuoi_ky ?? null;
  data.created_at = new Date();
  data.updated_at = new Date();
  return await db.collection(collectionName).insertOne(data);
}

export async function getStudentScores(studentId) {
  const db = getDB();

  const pipeline = [
    {
      $match: { student_id: new ObjectId(studentId) },
    },
    {
      $lookup: {
        from: "subjects",
        localField: "subject_id",
        foreignField: "_id",
        as: "subject_info",
      },
    },
    {
      $unwind: {
        path: "$subject_info",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        "subject_info._id": 1,
        "subject_info.ten_mon": 1,
        "subject_info.so_tin_chi": 1,
        diem_chuyen_can: 1,
        diem_giua_ky: 1,
        diem_cuoi_ky: 1,
        diem_tong: 1,
        created_at: 1,
        updated_at: 1,
      },
    },
    { $sort: { "subject_info.ten_mon": 1 } },
  ];

  return await db.collection("student_score").aggregate(pipeline).toArray();
}

export async function updateStudentScore(id, data) {
  const db = getDB();
  data.updated_at = new Date();
  return await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
}

export async function deleteStudentScore(id) {
  const db = getDB();
  return await db
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(id) });
}
