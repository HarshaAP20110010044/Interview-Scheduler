const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const participantRouter = require("./src/controllers/participant");
const interviewRouter = require("./src/controllers/interview");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/api/participant", participantRouter);
app.use("/api/interview", interviewRouter);

const port = 5000;

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/SchedulerDB");

app.get("/api", function (req, res) {
    res.json({
        success: "Working!",
    });
});

app.listen(5000, function () {
    console.log("server started on port " + port);
});
