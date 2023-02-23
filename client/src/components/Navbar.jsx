export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid m-3">
                <a className="navbar-brand" href="/">
                    Scheduler
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item ms-4">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/"
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item ms-4">
                            <a className="nav-link active" href="/">
                                Participants
                            </a>
                        </li>
                        <li className="nav-item ms-4">
                            <a className="nav-link active" href="/">
                            <i class="fa-regular fa-plus fs-3"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
