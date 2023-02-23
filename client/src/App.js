import { useState, useEffect } from "react";
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
        return "loading";
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
        <div id="interview-list h-50 w-100 border">
            <ul className="list-group">
                {interviews.map((interview, index) => {
                    return (
                        <li className="list-group-item">
                            <input
                                className="form-check-input me-1"
                                type="checkbox"
                                defaultValue=""
                                id="firstCheckbox"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="firstCheckbox"
                            >
                                {interview.url}
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

    return (
        <div className="container">
            <p className="m-5 mb-0 fs-2 fw-bold">Scheduled Interviews</p>
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
                <ScheduleModal />
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
