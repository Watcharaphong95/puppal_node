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

    let checkEmail = "SELECT * FROM user WHERE email = ? AND username IS NULL";
    checkEmail = mysql.format(checkEmail, [userData.email]);

    conn.query(checkEmail, (err, result) => {
        if(err) {
            res.status(400).json({msg: err.message});
        } else if (result.length > 0){
            let sql = "UPDATE user SET username = ?, profilePic = ? WHERE email = ?;"
            sql = mysql.format(sql, [
                userData.username,
                userData.profilePic,
                userData.email
            ])

            conn.query(sql, (err, result) => {
                if(err) {
                    res.status(400).json({msg: err.message});
                } else {
                    res.status(200).json({affected_rows: result.affectedRows, last_idx: result.insertId});
                }
            })
        } else {
            let sql = "INSERT INTO user (username, nameSurname, phone, email, password, profilePic) VALUES (?,?,?,?,?,?) "
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
