export default function InputDate({ id, classes, label, handleChange, value }) {
    return (
        <div className={classes}>
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input
                type="date"
                className="form-control"
                id={id}
                onChange={handleChange}
                value={value}
            />
        </div>
    );
}
