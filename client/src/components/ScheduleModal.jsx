import { useState, useEffect } from "react";
import Loading from "./Loading";

export default function ScheduleModal() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [duration, setDuration] = useState(0);
    const [pCount, setPCount] = useState(0);
    const [url, setURL] = useState("www.interview.com/any-random-url");

    useEffect(() => {
        fetch("http://localhost:5000/api/participant/")
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setParticipants(data);
                    console.log(data);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    if (!isLoaded) {
        return <Loading />;
    }

    function diff_minutes(dt2, dt1) {
        var diff = dt2.getTime() - dt1.getTime();
        return Math.round(diff / 60000);
    }

    function handleDateChange(e) {
        const date = new Date(e.target.value);
        const today = new Date();
        if (date < today) {
            alert("Date must be on or after " + today.toString());
            e.target.value = null;
        } else {
            setDate(date);
        }
    }

    function handleStartTimeChange(e) {
        if (!date) {
            alert("Please select the interview date!");
            e.target.value = null;
        } else {
            setStartTime(
                new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    e.target.value.slice(0, 2),
                    e.target.value.slice(3, 5)
                )
            );
        }
    }

    function handleEndTimeChange(e) {
        if (!date || !startTime) {
            alert("Please select the interview date and start time!");
            e.target.value = null;
        } else {
            const time = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                e.target.value.slice(0, 2),
                e.target.value.slice(3, 5)
            );
            if (time < startTime) {
                alert("Interview end time must be after " + startTime);
                e.target.value = null;
            } else {
                setEndTime(time);
                setDuration(diff_minutes(endTime, startTime));
            }
        }
    }

    function handleUrlChange(e) {
        setURL(e.target.value);
    }

    function handleChange(e) {
        if (e.target.checked) {
            setPCount(pCount + 1);
        } else {
            setPCount(pCount - 1);
        }
    }

    function handleClick(e) {
        let finalParticipants = [];
        var items = document.getElementsByClassName("form-check-input");
        console.log(items);
        for (var i = 0; i < items.length; i++) {
            if (items[i].checked) {
                finalParticipants.push(participants[Number(items[i].id)]);
            }
        }
        const data = {
            participants: finalParticipants,
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
            });
    }

    const participantsList = (
        <ul className="list-group">
            {participants.map((participant, index) => {
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
                        />
                        <label className="form-check-label" htmlFor={index}>
                            {participant.name} ({participant.email})
                        </label>
                        <button type="file" className="btn btn-outline-primary">
                            Upload Resume
                        </button>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <div className="modal" id="scheduleModal" tabIndex={-1}>
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
                                    <div className="mb-3">
                                        <label
                                            htmlFor="date"
                                            className="form-label"
                                        >
                                            Date:
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                    <div className="times-div">
                                        <div className="">
                                            <label
                                                htmlFor="startTime"
                                                className="form-label"
                                            >
                                                Start Time:
                                            </label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                id="startTime"
                                                onChange={handleStartTimeChange}
                                            />
                                        </div>
                                        <div className="">
                                            <label
                                                htmlFor="endTime"
                                                className="form-label"
                                            >
                                                End Time:
                                            </label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                id="endTime"
                                                onChange={handleEndTimeChange}
                                            />
                                        </div>
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
                            onClick={handleClick}
                        >
                            Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
