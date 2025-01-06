import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { DogData } from "../models/dog_data";

export const router = express.Router();

router.get("/", (req, res) => {
  let sql = "SELECT * FROM dog";

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ msg: err.message });
    } else {
      res.status(200).json(result);
    }
  });
});

router.get("/breed", (req, res) => {
    let sql = "SELECT * FROM breed";
  
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ msg: err.message });
      } else {
        res.status(200).json(result);
      }
    });
  });

router.get("/:uid", (req, res) => {
    let uid = req.params.uid;

    let sql = "SELECT dog.*, dog.name AS dogName, breed.name AS breed FROM dog, breed WHERE dog.b_did = breed.bid AND u_did = ?";

    sql = mysql.format(sql, [
        uid
    ])
  
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ msg: err.message });
      } else {
        res.status(200).json(result);
      }
    });
  });

router.post("/register", (req, res) => {
  let dogData: DogData = req.body;

  let sql =
    "INSERT INTO dog (b_did, u_did, name, gender, color, defect, birth, conDisease, vacHistory, sterilization, pic, hair, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) ";
  sql = mysql.format(sql, [
    dogData.b_did,
    dogData.u_did,
    dogData.name,
    dogData.gender,
    dogData.color,
    dogData.defect,
    dogData.birth,
    dogData.conDisease,
    dogData.vacHistory,
    dogData.sterilization,
    dogData.pic,
    dogData.hair,
    dogData.status,
  ]);

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ msg: err.message });
    } else {
      res
        .status(200)
        .json({
          affected_rows: result.affectedRows,
          last_idx: result.insertId,
        });
    }
  });
});
