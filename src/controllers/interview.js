const express = require("express");
const { Interview } = require("../models");
const interviewRouter = express.Router();

interviewRouter.get("/", (req, res) => {
    Interview.find({}, (err, interviews) => {
        if (err) {
            console.log(err);
        } else {
            res.json(interviews);
        }
    });
});

interviewRouter.post("/", (req, res) => {
    const { participants, date, startTime, endTime } = req.body;

    const interview = new Interview({
        participants: participants,
        date: date,
        startTime: startTime,
        endTime: endTime,
    });
    interview.save();

    res.json(interview);
});

interviewRouter.delete("/", (req, res) => {
    Interview.deleteMany({}, (err, count) => {
        if (err) {
            console.log(err);
        } else {
            res.json(count);
        }
    });
});

interviewRouter.get("/:interviewId", (req, res) => {
    Interview.findOne({ _id: req.params.interviewId }, (err, interview) => {
        if (err) {
            console.log(err);
        } else {
            res.json(interview);
        }
    });
});

interviewRouter.put("/:interviewId", (req, res) => {
    Interview.findOneAndUpdate(
        { _id: req.params.interviewId },
        { $set: req.body },
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );
    Interview.findOne({ _id: req.params.interviewId }, (err, interview) => {
        if (err) {
            console.log(err);
        } else {
            res.json(interview);
        }
    });
});

interviewRouter.delete("/:interviewId", (req, res) => {
    Interview.deleteOne({ _id: req.params.interviewId }, (err, count) => {
        if (err) {
            console.log(err);
        } else {
            res.json(count);
        }
    });
});

module.exports = interviewRouter;
