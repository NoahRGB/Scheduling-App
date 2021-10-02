const express = require("express");
const cors = require("cors");
const { Pool, Client } = require("pg");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

//connection parameters added in dotenv file
const dbPool = new Pool()
// dbPool.query("SELECT * FROM Users", (err, res) => {
//   console.log(err, res);
//   dbPool.end();
// })


app.get("/testRoute", (req, res) => {
    res.send("Test route working!");
});

app.post("/getActivities", (req, res) => {
    let activities = [];
    let responseRows;
    const date = convertToPgDate(req.body.date);
    const activityQuery = "SELECT * FROM Activities WHERE activitydate=$1;";
    dbPool.query(activityQuery, [date], (err, response) => {
        let names = [];
        if (response) {
            response.rows.forEach(row => names.push(row.name));
        }
        names.length == 0 && names.push("No events planned")
        res.send(names);
    });
});

const convertToPgDate = date => {
    let s = date.split("/");
    return `${s[2]}-${s[0]}-${s[1]}T00:00:00.000Z`;
}

const port = 8000;
app.listen(port, () => { console.log(`Listening on port ${port}`) });