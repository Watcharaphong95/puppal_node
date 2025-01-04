import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { UserRegister } from "../models/user_register";
import { ClinicRegister } from "../models/clinic_register";

export const router = express.Router();

router.get('/', (req, res)=>{
    let sql = "SELECT * FROM user WHERE type = 2"

    conn.query(sql, (err, result) => {
        if(err){
            res.status(400).json({msg: err.message});
        } else {
            res.status(200).json(result);
        }
    });
});

router.post('/register', (req, res) => {
    let clinicData: ClinicRegister = req.body;

    let sql = "INSERT INTO user (username, nameSurname, phone, email, password, profilePic, lat, lng, type) VALUES (?,?,?,?,?,?,?,?,?)"
    sql = mysql.format(sql, [
        clinicData.username,
        clinicData.nameSurname,
        clinicData.phone,
        clinicData.email,
        clinicData.password,
        clinicData.profilePic,
        clinicData.lat,
        clinicData.lng,
        clinicData.type
    ])

    conn.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({msg: err.message});
        } else {
            res.status(200).json({affected_rows: result.affectedRows, last_idx: result.insertId});
        }
    })
})