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
    let checkData: UserRegister;

    let checkEmail = "SELECT * FROM user WHERE email = ? AND clinicname IS NULL";
    checkEmail = mysql.format(checkEmail, [clinicData.email]);

    conn.query(checkEmail, (err, result) => {
            if(err) {
                res.status(400).json({msg: err.message});
            } else if (result.length > 0){
                let sql = "UPDATE user SET clinicname = ?, profileClinicPic = ?, lat = ?, lng = ? WHERE email = ?;"
                sql = mysql.format(sql, [
                    clinicData.clinicname,
                    clinicData.profileClinicPic,
                    clinicData.lat,
                    clinicData.lng,
                    clinicData.email
                ])
                conn.query(sql, (err, result) => {
                    if(err) {
                        res.status(400).json({msg: err.message});
                    } else {
                        res.status(200).json({affected_rows: result.affectedRows, last_idx: result.insertId});
                    }
                })
            } else {
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