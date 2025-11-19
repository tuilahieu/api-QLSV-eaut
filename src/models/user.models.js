import { getDB } from "../services/database.services.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const collectionName = "users";

export async function getAllUsers(role = "student", lop_hoc_id = null) {
  const db = getDB();
  const filter = { role };

  // if (lop_hoc_id) {
  //   filter.lop_hoc_id = lop_hoc_id;
  // }
  // console.log(filter);

  return await db
    .collection(collectionName)
    .find(filter, { projection: { password: 0 } })
    .toArray();
}

export async function getUserByUsername(username) {
  const db = getDB();
  return await db.collection(collectionName).findOne({ username });
}

export async function createUser(user) {
  const db = getDB();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.created_at = new Date();
  user.updated_at = new Date();
  const result = await db
    .collection(collectionName)
    .insertOne({ ...user, password: hashedPassword });
  return result.insertedId.toString();
}

export async function updateUser(id, data) {
  const db = getDB();
  data.updated_at = new Date();
  const result = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  return result.matchedCount;
}

export async function deleteuser(id) {
  const db = getDB();
  const result = await db
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}
