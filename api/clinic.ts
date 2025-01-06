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

    let sqlCheck = "SELECT * FROM user WHERE email = ?"
    sqlCheck = mysql.format(sqlCheck, [
        clinicData.email
    ])

    conn.query(sqlCheck, (err, result) => {
        if(result){
            
        }
    })

    let sql = "INSERT INTO user (clinicname, nameSurname, phone, email, password, profileClinicPic, lat, lng) VALUES (?,?,?,?,?,?,?,?)"
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