export default function InputTime(props) {
    return (
        <div id={props.id}>
            <label className="form-label">{props.label}</label>
            <div>
                <div className="d-inline-block" style={{ width: "40%" }}>
                    <label htmlFor={props.id + "Hrs"} className="form-label">
                        Hours:
                    </label>
                    <input
                        type="number"
                        className="form-control w-75"
                        id={props.id + "Hrs"}
                        onChange={props.handleHrsChange}
                        min="0"
                        max="23"
                        value={props.hrsValue}
                    />
                </div>
                <div className="d-inline-block" style={{ width: "40%" }}>
                    <label htmlFor={props.id + "Mins"} className="form-label">
                        Minutes:
                    </label>
                    <input
                        type="number"
                        className="form-control w-75"
                        id={props.id + "Mins"}
                        onChange={props.handleMinsChange}
                        min="0"
                        max="59"
                        value={props.minsValue}
                    />
                </div>
            </div>
        </div>
    );
}
