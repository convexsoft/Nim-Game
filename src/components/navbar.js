function navbar(props){
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <h2 className="navbar-brand" href="/"> Nim Game </h2>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a className="nav-link" href="/"> Home </a>
                    </li>
                    <li class="nav-item active">
                        <a className="nav-link" href="/play"> Play </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default navbar;