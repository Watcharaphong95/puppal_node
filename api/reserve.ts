import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { ReserveInput } from "../models/reserve_input";

export const router = express.Router();

router.get("/", (req, res) => {
  let sql = "SELECT * FROM reserve";

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ msg: err.message });
    } else {
      res.status(200).json(result);
    }
  });
});



router.post("/add", (req, res) => {
  let reserveData: ReserveInput = req.body;

  let sql = "INSERT INTO reserve (u_rid, doc_rid, d_rid, date) VALUES (?,?,?,?) ";
  sql = mysql.format(sql, [
    reserveData.u_rid,
    reserveData.doc_rid,
    reserveData.d_rid,
    reserveData.date
  ]);

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ msg: err.message });
    } else {
      res.status(200).json({
        affected_rows: result.affectedRows,
        last_idx: result.insertId,
      });
    }
  });
});
