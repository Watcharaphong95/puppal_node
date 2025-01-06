import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";

export const router = express.Router();

router.get('/', (req, res)=>{
    let sql = "SELECT * FROM user"

    conn.query(sql, (err, result) => {
        if(err){
            res.status(400).json({msg: err.message});
        } else {
            res.status(200).json({msg: "TEST"});
        }
    });
});

router.post('/register', (req, res) => {
    let sql = "INSERT INTO user (username, nameSurname, email, password, profilePic, type) VALUES (?,?,?,?,?,?)"
    
})
