import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { UserRegister } from "../models/user_register";
import { ClinicRegister } from "../models/clinic_register";

export const router = express.Router();

router.get('/', (req, res)=>{
    let sql = "SELECT * FROM user WHERE cid IS NOT NULL"

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

    let sql = `
        INSERT INTO user (clinicname, nameSurname, phone, email, password, profileClinicPic, lat, lng) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        clinicname = CASE WHEN clinicname IS NULL THEN VALUES(clinicname) ELSE clinicname END,
        nameSurname = CASE WHEN nameSurname IS NULL THEN VALUES(nameSurname) ELSE nameSurname END,
        phone = CASE WHEN phone IS NULL THEN VALUES(phone) ELSE phone END,
        password = CASE WHEN password IS NULL THEN VALUES(password) ELSE password END,
        profileClinicPic = CASE WHEN profileClinicPic IS NULL THEN VALUES(profileClinicPic) ELSE profileClinicPic END,
        lat = CASE WHEN lat IS NULL THEN VALUES(lat) ELSE lat END,
        lng = CASE WHEN lng IS NULL THEN VALUES(lng) ELSE lng END;
    `
    sql = mysql.format(sql, [
        clinicData.clinicname,
        clinicData.nameSurname,
        clinicData.phone,
        clinicData.email,
        clinicData.password,
        clinicData.profileClinicPic,
        clinicData.lat,
        clinicData.lng,
    ])

    conn.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({msg: err.message});
        } else {
            res.status(200).json({affected_rows: result.affectedRows, last_idx: result.insertId});
        }
    })
})

router.get('/search/:word', (req, res) => {
    let word = req.params.word; 

    let sql = "SELECT * FROM user WHERE cid IS NOT NULL AND username LIKE CONCAT(?,'%')"
    sql = mysql.format(sql, [
        word
    ])

    conn.query(sql, (err, result) => {
        if(err){
            res.status(400).json({msg: err.message});
        } else {
            res.status(200).json(result);
        }
    });
});