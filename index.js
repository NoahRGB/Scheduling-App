const express = require("express");
const cors = require("cors");
const { Pool, Client } = require("pg");
const bodyParser = require("body-parser");
const e = require("express");
require("dotenv").config();

const app = express();
app.use(cors());

const dbPool = new Pool(); //connection parameters for db included in dotenv file

app.get("/testRoute", (req, res) => {
    res.send("Test route working!");
});

app.use(bodyParser.json());

app.post("/login", (req, res) => {
    const loginQuery = "SELECT * FROM Users WHERE username=$1 AND password=$2;";
    dbPool.query(loginQuery, [req.body.username, req.body.password], (err, response) => {
        if (response.rows.length == 1) {
            res.send(`{ "status": "success" }`);
        } else {
            res.send(`{ "status": "fail" }`);
        }
    });
});

app.post("/register", (req, res) => {
    const existingCheckQuery = "SELECT * FROM Users WHERE username=$1";
    const registerQuery = "INSERT INTO Users(username, password) VALUES($1, $2)";
    dbPool.query(existingCheckQuery, [req.body.username], (err, response) => {
        if (response.rows.length == 0) {
            dbPool.query(registerQuery, [req.body.username, req.body.password], (e, r) => {
                if (!err) {
                    res.send(`{ "status": "User registered" }`);
                } else {
                    console.error(err);
                }
            });
        } else {
            res.send(`{ "status": "User already exists" }`);
        }
    });
});

app.post("/add-event", (req, res) => {
    const addEventQuery = "INSERT INTO Activities(activitydate, text, username) VALUES($1, $2, $3);";
    const fullDate = `${req.body.dateInfo.month+1}/${req.body.dateInfo.day}/${req.body.dateInfo.year}`;
    dbPool.query(addEventQuery, [fullDate, req.body.activity, req.body.username], (err, response) => {
        if (!err) {
            res.send(`{ "status": "success" }`);
        } else {
            console.error(err);
        }
    });
});

app.post("/getActivities", (req, res) => {
    let activities = [];
    let responseRows;
    const activityQuery = "SELECT * FROM Activities WHERE activitydate=$1 AND username=$2;";
    dbPool.query(activityQuery, [req.body.date, req.body.username], (err, response) => {
        let names = [];
        if (response) {
            response.rows.forEach(row => names.push(row.text));
        }
        names.length == 0 && names.push("No events planned")
        res.send(names);
    });
});

const port = 8000;
app.listen(port, () => { console.log(`Listening on port ${port}`) });