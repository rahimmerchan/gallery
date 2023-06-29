import express from 'express';
const app = express()
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const salt = 10;


const db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "signup",
    });

app.post('/singUp', (req, res) => {
      const sql = "INSERT INTO users ('email', 'pw') VALUES (?)";
      bycrpyt.has(req.body.pw.toString(), salt, (err, has)=> {
            if(err) return res.json({Error: "Error for hassing password"});})
      const values = [
            req.body.email,
            hash
      ]
      db.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inserting data Error in server"});
            return res.json({Status: "Success"});
      })
})

app.listen(8081, ()=>{
      console.log('server is runging on port 8081')
})
    