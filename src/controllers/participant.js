const express = require("express");
const { Participant } = require("../models");
const participantRouter = express.Router();

participantRouter.get("/", (req, res) => {
    Participant.find({}, (err, participants) => {
        if (err) {
            console.log(err);
        } else {
            res.json(participants);
        }
    });
});

participantRouter.post("/", (req, res) => {
    const { name, email, resume } = req.body;

    const participant = new Participant({
        name: name,
        email: email,
        resume: resume,
    });
    participant.save();

    res.json(participant);
});

participantRouter.delete("/", (req, res) => {
    Participant.deleteMany({}, (err, count) => {
        if (err) {
            console.log(err);
        } else {
            res.json(count);
        }
    });
});

participantRouter.get("/:userId", (req, res) => {
    Participant.findOne({ _id: req.params.userId }, (err, participant) => {
        if (err) {
            console.log(err);
        } else {
            res.json(participant);
        }
    });
});

participantRouter.delete("/:userId", (req, res) => {
    Participant.deleteOne({ _id: req.params.userId }, (err, count) => {
        if (err) {
            console.log(err);
        } else {
            res.json(count);
        }
    });
});

module.exports = participantRouter;
