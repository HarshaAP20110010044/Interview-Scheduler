import { useState, useEffect } from "react";
import InputDate from "./InputDate";
import InputTime from "./InputTime";
import Loading from "./Loading";

export default function Modal(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [date, setDate] = useState(props.date);
    const [startTime, setStartTime] = useState(props.startTime);
    const [endTime, setEndTime] = useState(props.endTime);
    const [duration, setDuration] = useState(diff_minutes(startTime, endTime));
    const [selectedParticipants, setSelectedParticipants] = useState(
        props.selectedParticipants
    );
    const [pCount, setPCount] = useState(props.selectedParticipants.length);
    const [url, setURL] = useState("www.interview.com/any-random-url");
    const [interviews, setInterviews] = useState(props.interviews);

    useEffect(() => {
        fetch("http://localhost:5000/api/participant/")
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setParticipants(data);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    if (!isLoaded) {
        return <Loading />;
    }

    function diff_minutes(startTime, endTime) {
        let sh = startTime.hours;
        let sm = startTime.minutes;
        let eh = endTime.hours;
        let em = endTime.minutes;
        let mins = 0;
        if (sh > eh) {
            eh += 24;
        }
        let hrs = eh - sh - 1;
        mins += hrs * 60;
        mins += 60 - sm;
        mins += em;
        return mins;
    }

    function handleDateChange(e) {
        setDate(e.target.value);
        for (let i = 0; i < interviews.length; i++) {
            if (interviews[i]._id === props.id) {
                interviews[i].date = e.target.value;
                setInterviews([...interviews]);
                break;
            }
        }
    }

    function handleStartTimeHrsChange(e) {
        const hrs = Number(e.target.value);
        const sTime = { ...startTime, hours: hrs };
        setStartTime(sTime);
        const eTime = { ...endTime, hours: (hrs + 1) % 24 };
        setEndTime(eTime);
        const diff = diff_minutes(sTime, eTime);
        setDuration(diff);
    }

    function handleStartTimeMinsChange(e) {
        const mins = Number(e.target.value);
        const sTime = { ...startTime, minutes: mins };
        setStartTime(sTime);
        const eTime = { ...endTime, minutes: mins };
        setEndTime(eTime);
        const diff = diff_minutes(sTime, eTime);
        setDuration(diff);
    }

    function handleEndTimeHrsChange(e) {
        const hrs = Number(e.target.value);
        const sTime = { ...startTime };
        const eTime = { ...endTime, hours: hrs };
        setEndTime(eTime);
        const diff = diff_minutes(sTime, eTime);
        setDuration(diff);
    }

    function handleEndTimeMinsChange(e) {
        const mins = Number(e.target.value);
        const sTime = { ...startTime };
        const eTime = { ...endTime, minutes: mins };
        setEndTime(eTime);
        const diff = diff_minutes(sTime, eTime);
        setDuration(diff);
    }

    function handleUrlChange(e) {
        setURL(e.target.value);
    }

    function handleChange(e) {
        let id = Number(e.target.id);
        if (e.target.checked) {
            setPCount(pCount + 1);
            setSelectedParticipants([
                ...selectedParticipants,
                participants[id],
            ]);
        } else {
            setPCount(pCount - 1);
            let idx = 0;
            for (let i = 0; i < selectedParticipants.length; i++) {
                if (selectedParticipants[i]._id === participants[id]._id) {
                    idx = i;
                    break;
                }
            }
            selectedParticipants.splice(idx, 1);
            setSelectedParticipants([...selectedParticipants]);
        }
    }

    function handlePostClick() {
        if (selectedParticipants.length < 2) {
            alert("Please select at least two participants!");
            return;
        }
        let overlaps = [];
        for (let j = 0; j < props.interviews.length; j++) {
            if (props.interviews[j].date === date) {
                if (
                    props.interviews[j].startTime.hours <=
                        startTime.hours <=
                        props.interviews[j].endTime.hours ||
                    props.interviews[j].startTime.hours <=
                        endTime.hours <=
                        props.interviews[j].endTime.hours
                ) {
                    for (let i = 0; i < selectedParticipants.length; i++) {
                        for (
                            let k = 0;
                            k < props.interviews[j].participants.length;
                            k++
                        ) {
                            if (
                                selectedParticipants[i]._id ===
                                props.interviews[j].participants[k]._id
                            ) {
                                overlaps.push(selectedParticipants[i].name);
                            }
                        }
                    }
                }
            }
        }
        if (overlaps.length > 0) {
            alert(overlaps.join(", ") + " are busy!");
            return;
        }
        const data = {
            participants: selectedParticipants,
            date: date,
            startTime: startTime,
            endTime: endTime,
            url: url,
        };
        fetch("http://localhost:5000/api/interview/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                props.setInterviews((interviews) => [...interviews, data]);
            });
    }

    function handlePutClick() {
        if (selectedParticipants.length < 2) {
            alert("Please select at least two participants!");
            return;
        }
        let overlaps = [];
        for (let j = 0; j < props.interviews.length; j++) {
            if (props.interviews[j]._id === props.id) {
                continue;
            }
            if (props.interviews[j].date === date) {
                if (
                    (props.interviews[j].startTime.hours <= startTime.hours &&
                        startTime.hours <= props.interviews[j].endTime.hours) ||
                    (props.interviews[j].startTime.hours <= endTime.hours &&
                        endTime.hours <= props.interviews[j].endTime.hours)
                ) {
                    for (let i = 0; i < selectedParticipants.length; i++) {
                        for (
                            let k = 0;
                            k < props.interviews[j].participants.length;
                            k++
                        ) {
                            if (
                                selectedParticipants[i]._id ===
                                props.interviews[j].participants[k]._id
                            ) {
                                overlaps.push(selectedParticipants[i].name);
                            }
                        }
                    }
                }
            }
        }
        if (overlaps.length > 0) {
            alert(overlaps.join(", ") + " are busy!");
            return;
        }
        const data = {
            participants: selectedParticipants,
            date: date,
            startTime: startTime,
            endTime: endTime,
            url: url,
        };
        console.log(data);
        fetch("http://localhost:5000/api/interview/" + props.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                props.setInterviews(interviews);
            });
    }

    function handleResumeClick(e) {
        let id = e.target.id.slice(1);
        document.getElementById("f" + id).click();
        document.getElementById("b" + id).innerHTML = "Resume Uploaded";
    }

    const participantsList = (
        <ul className="list-group">
            {participants
                .sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    } else if (a.name > b.name) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .map((participant, index) => {
                    return (
                        <li
                            key={index}
                            className="list-group-item border-0 p-list-item"
                        >
                            <input
                                className="form-check-input m-0 me-3"
                                type="checkbox"
                                defaultValue=""
                                id={index}
                                onChange={handleChange}
                                checked={
                                    selectedParticipants.find(function (p) {
                                        return p.name === participant.name;
                                    })
                                        ? true
                                        : false
                                }
                            />
                            <label className="form-check-label" htmlFor={index}>
                                {participant.name} ({participant.email})
                            </label>
                            <input
                                type="file"
                                id={"f" + participant._id}
                                className="d-none"
                                accept=".pdf"
                            />
                            <button
                                type="file"
                                className="btn btn-outline-primary"
                                id={"b" + participant._id}
                                onClick={handleResumeClick}
                            >
                                Upload Resume
                            </button>
                        </li>
                    );
                })}
        </ul>
    );

    return (
        <div className="modal" id={props.id} tabIndex={-1}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header px-4">
                        <h5 className="modal-title fw-bold">
                            Schedule A New Interview
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="row my-3">
                                <div className="col-6">
                                    <InputDate
                                        id="date"
                                        classes="mb-3"
                                        label="Date:"
                                        handleChange={handleDateChange}
                                        value={date}
                                    />
                                    <div className="times-div">
                                        <InputTime
                                            id="startTime"
                                            label="Start Time:"
                                            handleHrsChange={
                                                handleStartTimeHrsChange
                                            }
                                            handleMinsChange={
                                                handleStartTimeMinsChange
                                            }
                                            hrsValue={startTime.hours}
                                            minsValue={startTime.minutes}
                                        />
                                        <InputTime
                                            id="endTime"
                                            label="End Time:"
                                            handleHrsChange={
                                                handleEndTimeHrsChange
                                            }
                                            handleMinsChange={
                                                handleEndTimeMinsChange
                                            }
                                            hrsValue={endTime.hours}
                                            minsValue={endTime.minutes}
                                        />
                                    </div>
                                    <p className="my-4">
                                        Duration: {duration} mins
                                    </p>
                                    <p className="my-4">
                                        Number of Participants: {pCount}
                                    </p>
                                    <div className="mb-3 pe-3">
                                        <label
                                            htmlFor="url"
                                            className="form-label"
                                        >
                                            Meeting url:
                                        </label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            id="url"
                                            placeholder="www.interview.com"
                                            value={url}
                                            onChange={handleUrlChange}
                                        />
                                    </div>
                                    <p className="m-0 mt-4 fs-6 text-secondary">
                                        *An email with interview details will be
                                        sent to all the participants.
                                    </p>
                                </div>
                                <div className="col-6">
                                    <p>Select Participants:</p>
                                    <div className="participants-div border">
                                        {participantsList}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer px-4">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={
                                props.edit ? handlePutClick : handlePostClick
                            }
                        >
                            {props.edit ? "Save" : "Schedule"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
