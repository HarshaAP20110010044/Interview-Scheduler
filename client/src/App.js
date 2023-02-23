import CreateButton from "./components/CreateButton";
import { useState, useEffect } from "react";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [participants, setParticipants] = useState([]);

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
        return "loading";
    }

    const emptyHtml = (
        <div id="main-section" className="text-center">
            <img
                src="/images/meeting.png"
                alt="meeting"
                className="main-img m-3"
            />
            <p className="fs-3 ">No interviews scheduled!</p>
            <CreateButton />
        </div>
    );

    const participantList = (
        <div id="interview-list h-50 w-100 border">
            <ul className="list-group">
                {participants.map((participant) => {
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
                                {participant.name}
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

    return (
        <div className="container-fluid h-100 p-0 m-0">
            <div className="r">
                <div className="c-1">
                    <div className="py-3 px-2 mb-5 logo-div">
                        <p className="fw-bold fs-2 m-0 logo">Scheduler</p>
                        <img
                            src="/images/more.png"
                            className="more-img"
                            alt="more"
                        />
                    </div>
                    <div className="c-item border-bottom-0">
                        <img src="/images/tab.png" alt="create" />
                        <p>Schedule an Interview</p>
                    </div>
                    <div className="c-item border-bottom-0">
                        <img src="/images/schedule.png" alt="scheduled" />
                        <p>Scheduled Interviews</p>
                    </div>
                    <div className="c-item">
                        <img src="/images/group-chat.png" alt="participants" />
                        <p>View Participants</p>
                    </div>
                </div>
                <div className="c-2 h-100">
                    <div className="m-5">
                        <label for="date">Date:</label>
                        <input type="date" id="date" className="ms-2" />
                        <label for="time" className="ms-5">
                            Time:
                        </label>
                        <input type="time" id="time" className="ms-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
