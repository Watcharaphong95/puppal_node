import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";
import { UserRegister } from "../models/user_register";
import { LoginData } from "../models/login_data";

export const router = express.Router();

router.get('/', (req, res)=>{
    let sql = "SELECT * FROM user WHERE type = 1"

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

    let sql = "INSERT INTO user (username, nameSurname, phone, email, password, profilePic, type) VALUES (?,?,?,?,?,?,?)"
    sql = mysql.format(sql, [
        userData.username,
        userData.nameSurname,
        userData.phone,
        userData.email,
        userData.password,
        userData.profilePic,
        userData.type
    ])

    conn.query(sql, (err, result) => {
        if(err) {
            res.status(400).json({msg: err.message});
        } else {
            res.status(200).json({affected_rows: result.affectedRows, last_idx: result.insertId});
        }
    })
})

router.get('/login', (req, res)=>{
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
