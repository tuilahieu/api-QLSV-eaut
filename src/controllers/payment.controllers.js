import * as Payments from "../models/payment.models.js";
import { getDB } from "../services/database.services.js";
import { ObjectId } from "mongodb";

class PaymentController {
  async getPaymentsForStudent(req, res) {
    try {
      const studentId = req.params.studentId;
      //   console.log(req.params);
      const payments = await Payments.getPaymentsByStudent(studentId);
      res.json({ status: true, data: payments });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, error: error.message });
    }
  }
  // Tạo thanh toán
  async create(req, res) {
    try {
      const newPaymentId = await Payments.createPayment(req.body);
      res.status(201).json({ status: true, id: newPaymentId });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  // Lấy tất cả thanh toán của sinh viên

  // Cập nhật thanh toán
  async update(req, res) {
    try {
      const db = getDB();
      const paymentId = req.params.id;
      const data = req.body;
      data.updated_at = new Date();

      if (data.student_id) data.student_id = new ObjectId(data.student_id);
      if (data.subject_id) data.subject_id = new ObjectId(data.subject_id);

      const result = await db
        .collection("payments")
        .updateOne({ _id: new ObjectId(paymentId) }, { $set: data });

      if (!result.matchedCount)
        return res
          .status(404)
          .json({ status: false, message: "Không tìm thấy thanh toán." });

      res.json({ status: true, message: "Cập nhật thành công" });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const { paymentId } = req.params;
      const { status } = req.body; // pending | success | failed

      const updated = await Payments.updatePaymentStatus(paymentId, status);
      if (!updated)
        return res
          .status(404)
          .json({ status: false, message: "Không tìm thấy thanh toán" });

      res.json({
        status: true,
        message: `Cập nhật trạng thái thành ${status}`,
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }

  // Xóa thanh toán
  async remove(req, res) {
    try {
      const db = getDB();
      const paymentId = req.params.id;

      const result = await db
        .collection("payments")
        .deleteOne({ _id: new ObjectId(paymentId) });

      if (!result.deletedCount)
        return res
          .status(404)
          .json({ status: false, message: "Không tìm thấy thanh toán." });

      res.json({ status: true, message: "Xóa thanh toán thành công" });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  }
}

export default new PaymentController();
