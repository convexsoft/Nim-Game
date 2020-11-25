function navbar(props){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h2 className="navbar-brand" href="/"> Nim Game </h2>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/"> Home </a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/play"> Play </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default navbar;