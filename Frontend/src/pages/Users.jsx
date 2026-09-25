import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const fuzzyMatch = (value, query) => {
    const text = String(value).toLowerCase();
    const searchText = query.toLowerCase();

    if (!searchText || text.includes(searchText)) {
        return true;
    }

    let queryIndex = 0;

    for (const character of text) {
        if (character === searchText[queryIndex]) {
            queryIndex += 1;
        }

        if (queryIndex === searchText.length) {
            return true;
        }
    }

    return false;
};

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim().toLowerCase());
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/users`);

                const data = await response.json();

                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        };

        getUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        fuzzyMatch(user.id, debouncedSearch) ||
        fuzzyMatch(user.name, debouncedSearch) ||
        fuzzyMatch(user.email, debouncedSearch)
    );

    return (
        <div className="page">

            <h1>All Users</h1>

            <input
                className="search"
                type="text"
                placeholder="Search by ID, name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="user-container">

                {filteredUsers.length === 0 ? (
                    <p>No users found</p>
                ) : (
                    filteredUsers.map((user) => (
                        <div className="user-card" key={user.id}>

                            <h2>{user.name}</h2>

                            <p>
                                <strong>ID:</strong> {user.id}
                            </p>

                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>

                            <p>
                                <strong>Phone:</strong> {user.phone}
                            </p>

                            <p>
                                <strong>Address:</strong> {user.address}
                            </p>

                            <p>
                                <strong>Age:</strong> {user.age}
                            </p>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
};

export default Users;