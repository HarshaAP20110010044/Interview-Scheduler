const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    name: String,
    email: String,
    resume: String,
});

const interviewSchema = new mongoose.Schema({
    participants: [participantSchema],
    startTime: Date,
    endTime: Date,
    url: String
});

const Participant = mongoose.model("Participant", participantSchema);
const Interview = mongoose.model("Interview", interviewSchema);

module.exports = { Participant, Interview };
