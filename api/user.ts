import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { UserRegister } from "../models/user_register";
import { LoginData } from "../models/login_data";

export const router = express.Router();

router.get('/', (req, res)=>{
    let sql = "SELECT * FROM user WHERE cid IS NULL"

    conn.query(sql, (err, result) => {
        if(err){
            res.status(400).json({msg: err.message});
        } else {
            res.status(200).json(result);
        }
    });
});

router.post('/register', (req, res) => {
    let userData: UserRegister = req.body;

    let sql = `
        INSERT INTO user (username, nameSurname, phone, email, password, profilePic)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        username = CASE WHEN username IS NULL THEN VALUES(username) ELSE username END,
        nameSurname = CASE WHEN nameSurname IS NULL THEN VALUES(nameSurname) ELSE nameSurname END,
        phone = CASE WHEN phone IS NULL THEN VALUES(phone) ELSE phone END,
        password = CASE WHEN password IS NULL THEN VALUES(password) ELSE password END,
        profilePic = CASE WHEN profilePic IS NULL THEN VALUES(profilePic) ELSE profilePic END;
    `
    sql = mysql.format(sql, [
        userData.username,
        userData.nameSurname,
        userData.phone,
        userData.email,
        userData.password,
        userData.profilePic,
    ])

    conn.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({msg: err.message});
        } else {
            res.status(200).json({affected_rows: result.affectedRows, last_idx: result.insertId});
        }
    })
})

router.post('/login', (req, res)=>{
    let loginData: LoginData = req.body;

    let sql = "SELECT * FROM user WHERE email = ? AND password = ?"
    sql = mysql.format(sql, [
        loginData.email,
        loginData.password
    ])

    conn.query(sql, (err, result) => {
        if(err){
            res.status(400).json({msg: err.message});
        } else {
            res.status(200).json(result);
        }
    });
});
