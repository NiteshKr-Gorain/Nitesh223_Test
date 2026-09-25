import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/users">Users</Link>

                <Link to="/create">Create</Link>

                <Link to="/update">Update</Link>
                <Link to="/delete">Delete</Link>

            </div>

        </nav>
    );
}

export default Navbar;