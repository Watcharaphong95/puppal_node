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

  if (reserveData.doc_rid == reserveData.u_rid) {
    res.status(400).json({ msg: "CANT RESERVE YOURSELF" });
  }

  let sql =
    "INSERT INTO reserve (u_rid, doc_rid, d_rid, date) VALUES (?,?,?,?) ";
  sql = mysql.format(sql, [
    reserveData.u_rid,
    reserveData.doc_rid,
    reserveData.d_rid,
    reserveData.date,
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

router.get("/:did", (req, res) => {
  let did = req.params.did;

  let sql = "SELECT reserve.d_rid, dog.pic AS dogPic, dog.name AS dogname, user.username AS ownername, user.profilePic AS owmerPic, reserve.date, reserve.status FROM reserve, user, dog WHERE reserve.u_rid = user.uid AND reserve.d_rid = dog.did AND doc_rid = ? AND reserve.status = ?";

  sql = mysql.format(sql, [did, 0]);

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ msg: err.message });
    } else {
      res.status(200).json(result);
    }
  });
});
