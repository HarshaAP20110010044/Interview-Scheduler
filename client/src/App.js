import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import ScheduleModal from "./components/ScheduleModal";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [interviews, setInterviews] = useState([]);

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
        <div id="interview-list" className="m-5 my-3">
            <div className="row row-cols-3">
                {interviews.map((interview, i) => {
                    return (
                        <div className="col mb-2">
                            <div className="card" key={i}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Interview #{i + 1}
                                    </h5>
                                    <p className="card-text">
                                        Start Time:{" "}
                                        {interview.startTime.toString()}
                                        <br />
                                        End Time: {interview.endTime.toString()}
                                        <br />
                                        No. of participants:{" "}
                                        {interview.participants.length}
                                    </p>
                                    <div className="text-center">
                                        <button className="btn btn-danger m-1">
                                            Cancel
                                        </button>
                                        <button className="btn btn-warning m-1">
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
                <div className="m-5 my-4">
                    <label htmlFor="from" className="form-label">
                        From:
                    </label>
                    <input type="date" className="form-control" id="from" />
                </div>
                <div className="m-5 my-4">
                    <label htmlFor="to" className="form-label">
                        To:
                    </label>
                    <input type="date" className="form-control" id="to" />
                </div>
                <ScheduleModal setInterviews={setInterviews} />
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
