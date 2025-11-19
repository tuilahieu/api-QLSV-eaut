import { getDB } from "../services/database.services.js";
import { ObjectId } from "mongodb";

const scheduleCollection = "schedules";
const subjectClassCollection = "subject_class";
const subjectCollection = "subjects";
const userCollection = "users";

// Lấy lịch học theo class_id
export async function getSchedulesByClassId(classId) {
  const db = getDB();
  return await db
    .collection(scheduleCollection)
    .find({ class_id: new ObjectId(classId) })
    .toArray();
}

export async function getClassesByTeacher(teacherId) {
  const db = getDB();

  const pipeline = [
    {
      $match: { giao_vien_id: new ObjectId(teacherId) }, // Lọc theo giáo viên
    },
    {
      $lookup: {
        from: "classes",
        localField: "class_id",
        foreignField: "_id",
        as: "class_info",
      },
    },
    {
      $lookup: {
        from: "subjects",
        localField: "subject_id",
        foreignField: "_id",
        as: "subject",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "giao_vien_id",
        foreignField: "_id",
        as: "teacher",
      },
    },
    { $unwind: "$class_info" },
    { $unwind: "$subject" },
    { $unwind: "$teacher" },
    {
      $project: {
        _id: 1, // id của lịch
        thu: 1,
        loai_lich: 1,
        ngay: 1,
        tiet_bat_dau: 1,
        tiet_ket_thuc: 1,
        phong_hoc: 1,
        ghi_chu: 1,

        // giữ tên và tín chỉ môn
        subjectTen: "$subject.ten_mon",
        subjectSoTinChi: "$subject.so_tin_chi",
        subjectId: "$subject._id", // thêm field id riêng

        // giáo viên
        teacherHoTen: "$teacher.ho_ten",
        teacherId: "$teacher._id", // thêm field id riêng

        // lớp
        classTenLop: "$class_info.ten_lop",
        classId: "$class_info._id", // thêm field id riêng
      },
    },
    { $sort: { ngay: 1, tiet_bat_dau: 1 } },
  ];

  return await db.collection(scheduleCollection).aggregate(pipeline).toArray();
}

export async function getSchedulesWithDetailsByClassId(classId) {
  const db = getDB();

  // 1. Lấy danh sách môn học của lớp (có thể dùng để tham chiếu nếu cần)
  const subjectClass = await db.collection(subjectClassCollection).findOne({
    class_id: new ObjectId(classId),
  });

  // 2. Lấy tất cả lịch của lớp
  const schedules = await db
    .collection(scheduleCollection)
    .aggregate([
      { $match: { class_id: new ObjectId(classId) } },

      // join subject
      {
        $lookup: {
          from: subjectCollection,
          localField: "subject_id",
          foreignField: "_id",
          as: "subject",
        },
      },
      { $unwind: "$subject" },

      // join teacher
      {
        $lookup: {
          from: userCollection,
          localField: "giao_vien_id",
          foreignField: "_id",
          as: "teacher",
        },
      },
      { $unwind: "$teacher" },

      // chọn các trường cần thiết
      {
        $project: {
          _id: 1,
          class_id: 1,
          thu: 1,
          ngay: 1,
          tiet_bat_dau: 1,
          tiet_ket_thuc: 1,
          phong_hoc: 1,
          ghi_chu: 1,
          loai_lich: 1,
          "subject._id": 1,
          "subject.ten_mon": 1,
          "subject.so_tin_chi": 1,
          "teacher._id": 1,
          "teacher.ho_ten": 1,
        },
      },

      { $sort: { thu: 1, tiet_bat_dau: 1 } },
    ])
    .toArray();

  return schedules;
}

export async function createSchedule(schedule) {
  const db = getDB();
  schedule.subject_id = new ObjectId(schedule.subject_id);
  schedule.class_id = new ObjectId(schedule.class_id);
  schedule.giao_vien_id = new ObjectId(schedule.giao_vien_id);
  schedule.created_at = new Date();
  schedule.updated_at = new Date();

  const result = await db.collection(scheduleCollection).insertOne(schedule);
  return result.insertedId.toString();
}

/**
 * Cập nhật lịch học
 */
export async function updateSchedule(id, data) {
  const db = getDB();
  if (data.subject_id) data.subject_id = new ObjectId(data.subject_id);
  if (data.class_id) data.class_id = new ObjectId(data.class_id);
  if (data.giao_vien_id) data.giao_vien_id = new ObjectId(data.giao_vien_id);

  data.updated_at = new Date();
  const result = await db
    .collection(scheduleCollection)
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  return result.matchedCount;
}

/**
 * Xóa lịch học
 */
export async function deleteSchedule(id) {
  const db = getDB();
  const result = await db
    .collection(scheduleCollection)
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}
