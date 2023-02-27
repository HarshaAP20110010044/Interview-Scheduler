import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
import InputDate from "./components/InputDate";
import moment from "moment";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [interviews, setInterviews] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/interview/")
            .then((res) => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setInterviews(data);
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

    function handleCancel(e) {
        fetch("http://localhost:5000/api/interview/" + e.target.id, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                let idx = 0;
                for (let i = 0; i < interviews.length; i++) {
                    if (interviews[i]._id === e.target.id) {
                        idx = i;
                        break;
                    }
                }
                interviews.splice(idx, 1);
                setInterviews([...interviews]);
            });
    }

    function handleFromDateChange(e) {
        setFromDate(e.target.value);
    }

    function handleToDateChange(e) {
        setToDate(e.target.value);
    }

    const emptyList = (
        <div className="text-center">
            <img
                src="/images/meeting.png"
                alt="meeting"
                className="empty-img"
            />
            <p className="fs-5 m-4 text-secondary">No interviews scheduled!</p>
        </div>
    );

    const interviewList = (
        <div id="interview-list" className="m-5 my-2">
            <div className="row row-cols-4">
                {interviews
                    .filter(function (interview) {
                        if (fromDate === "" && toDate === "") {
                            return true;
                        } else if (fromDate === "") {
                            let d = new Date(toDate);
                            let t = new Date(interview.date);
                            return t <= d;
                        } else if (toDate === "") {
                            let d = new Date(fromDate);
                            let t = new Date(interview.date);
                            return t >= d;
                        } else {
                            let d1 = new Date(fromDate);
                            let d2 = new Date(toDate);
                            let t = new Date(interview.date);
                            return d1 <= t && t <= d2;
                        }
                    })
                    .sort(function (a, b) {
                        let d1 = new Date(
                            Number(a.date.slice(0, 4)),
                            Number(a.date.slice(5, 7)) - 1,
                            Number(a.date.slice(8)),
                            a.startTime.hours,
                            a.startTime.minutes,
                            0
                        );
                        let d2 = new Date(
                            Number(b.date.slice(0, 4)),
                            Number(b.date.slice(5, 7)) - 1,
                            Number(b.date.slice(8)),
                            b.startTime.hours,
                            b.startTime.minutes,
                            0
                        );
                        if (d1 < d2) {
                            return -1;
                        } else if (d1 > d2) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                    .map((interview, i) => {
                        return (
                            <div className="col mb-3" key={i}>
                                <Modal
                                    id={interview._id}
                                    date={interview.date}
                                    startTime={interview.startTime}
                                    endTime={interview.endTime}
                                    selectedParticipants={
                                        interview.participants
                                    }
                                    interviews={interviews}
                                    setInterviews={setInterviews}
                                    edit={true}
                                />
                                <div className="card">
                                    <div className="card-body text-center">
                                        <h5 className="card-title">
                                            Interview #{i + 1}
                                        </h5>
                                        <p className="card-text">
                                            Date: {interview.date}
                                            <br />
                                            Start Time:{" "}
                                            {(interview.startTime.hours < 10
                                                ? "0" +
                                                  interview.startTime.hours
                                                : interview.startTime.hours) +
                                                ":" +
                                                (interview.startTime.minutes <
                                                10
                                                    ? "0" +
                                                      interview.startTime
                                                          .minutes
                                                    : interview.startTime
                                                          .minutes)}
                                            <br />
                                            End Time:{" "}
                                            {(interview.endTime.hours < 10
                                                ? "0" + interview.endTime.hours
                                                : interview.endTime.hours) +
                                                ":" +
                                                (interview.endTime.minutes < 10
                                                    ? "0" +
                                                      interview.endTime.minutes
                                                    : interview.endTime
                                                          .minutes)}
                                            <br />
                                            No. of participants:{" "}
                                            {interview.participants.length}
                                        </p>
                                        <div className="text-center">
                                            <button
                                                id={interview._id}
                                                className="btn btn-danger m-1"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="btn btn-warning m-1"
                                                data-bs-toggle="modal"
                                                data-bs-target={
                                                    "#" + interview._id
                                                }
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );

    return (
        <div className="container">
            <p className="m-5 mt-4 mb-0 fs-2 fw-bold">Scheduled Interviews</p>
            <div className="filter-div">
                <InputDate
                    id="from"
                    classes="m-5 my-4"
                    label="From:"
                    handleChange={handleFromDateChange}
                    value={fromDate}
                />
                <InputDate
                    id="to"
                    classes="m-5 my-4"
                    label="To:"
                    handleChange={handleToDateChange}
                    value={toDate}
                />
                <Modal
                    id={"scheduleModal"}
                    date={moment(new Date()).format("YYYY-MM-DD")}
                    startTime={{
                        hours: 0,
                        minutes: 0,
                    }}
                    endTime={{
                        hours: 0,
                        minutes: 0,
                    }}
                    selectedParticipants={[]}
                    interviews={interviews}
                    setInterviews={setInterviews}
                    edit={false}
                />
                <div className="m-5 my-4 text-end">
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#scheduleModal"
                    >
                        Schedule A New Interview
                    </button>
                </div>
            </div>
            {interviews.length ? interviewList : emptyList}
        </div>
    );
}

export default App;
