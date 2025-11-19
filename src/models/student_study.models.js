import { getDB } from "../services/database.services.js";
import { ObjectId } from "mongodb";

const collectionName = "student_study";

export async function getAllStudentStudies() {
  const db = getDB();
  return await db.collection(collectionName).find().toArray();
}

export async function getStudentStudyByStudentAndClass(studentId) {
  const db = getDB();

  const pipeline = [
    {
      $match: {
        student_id: new ObjectId(studentId),
      },
    },

    // 🎓 Lấy thông tin sinh viên
    {
      $lookup: {
        from: "users",
        localField: "student_id",
        foreignField: "_id",
        as: "student",
      },
    },
    { $unwind: "$student" },

    // 🏫 Lấy thông tin lớp
    {
      $lookup: {
        from: "classes",
        localField: "class_id",
        foreignField: "_id",
        as: "class_info",
      },
    },
    { $unwind: "$class_info" },

    // 🧭 Lấy ngành từ class_info.nganh_id
    {
      $lookup: {
        from: "majors",
        localField: "class_info.nganh_id",
        foreignField: "_id",
        as: "major_info",
      },
    },
    { $unwind: "$major_info" },

    // 🏛 Lấy khoa từ class_info.khoa_id
    {
      $lookup: {
        from: "faculties",
        localField: "class_info.khoa_id",
        foreignField: "_id",
        as: "faculty_info",
      },
    },
    { $unwind: "$faculty_info" },

    // 🎯 Chỉ lấy trường cần thiết
    {
      $project: {
        _id: 1,
        // Student
        "student._id": 1,
        "student.ho_ten": 1,
        "student.email": 1,
        "student.gioi_tinh": 1,

        // Class
        "class_info._id": 1,
        "class_info.ten_lop": 1,

        // Major & Faculty
        "major_info._id": 1,
        "major_info.ten_nganh": 1,

        "faculty_info._id": 1,
        "faculty_info.ten_khoa": 1,

        // Extra fields
        khoa_dao_tao: 1,
        trang_thai: 1,
        created_at: 1,
        updated_at: 1,
      },
    },
  ];

  return await db.collection("student_study").aggregate(pipeline).toArray();
}

export async function getStudentStudyById(id) {
  const db = getDB();
  return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
}

export async function createStudentStudy(data) {
  const db = getDB();

  data.student_id = new ObjectId(data.student_id);
  data.class_id = new ObjectId(data.class_id);
  data.nganh_id = new ObjectId(data.nganh_id);
  data.khoa_id = new ObjectId(data.khoa_id);

  data.created_at = new Date();
  data.updated_at = new Date();

  const result = await db.collection(collectionName).insertOne(data);
  return result.insertedId.toString();
}

export async function updateStudentStudy(id, data) {
  const db = getDB();

  if (data.student_id) data.student_id = new ObjectId(data.student_id);
  if (data.class_id) data.class_id = new ObjectId(data.class_id);
  if (data.nganh_id) data.nganh_id = new ObjectId(data.nganh_id);
  if (data.khoa_id) data.khoa_id = new ObjectId(data.khoa_id);

  data.updated_at = new Date();

  const result = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: data });

  return result.matchedCount;
}

export async function deleteStudentStudy(id) {
  const db = getDB();
  const result = await db
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}
