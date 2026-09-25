import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function DeleteUser() {
    const [id, setId] = useState("");
    const [message, setMessage] = useState("");

    const deleteUser = async (e) => {
        e.preventDefault();
        const confirmDelete = window.confirm(
            "Delete this user?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/users/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message );
                return;
            }

            setMessage("User deleted.");

        } catch {
            setMessage("Cannot delete user.");
        }
    };

    return (
        <div className="page">

            <div className="form">

                <h1>Delete User</h1>
                {message && <h2 className="message">{message}</h2>}

                <form onSubmit={deleteUser}>

                    <input
                        type="text"
                        placeholder="Enter User ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Delete User
                    </button>

                </form>

            </div>

        </div>
    );
}

export default DeleteUser;