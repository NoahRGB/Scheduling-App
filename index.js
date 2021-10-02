const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/testRoute", (req, res) => {
    res.send("Test route working");
});

app.post("/getActivities", (req, res) => {
    const user = req.body.user;
    const date = req.body.date;
    
    res.send("");
});

const port = 8000;
app.listen(port, () => { console.log(`Listening on port ${port}`) });