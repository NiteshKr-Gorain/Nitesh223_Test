import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function UpdateUser() {
    const [id, setId] = useState("");
    const [found, setFound] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [message, setMessage] = useState("");

    const findUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${API_URL}/users/${id}`
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "User not found.");
                return;
            }

            const user = data;

            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
            setAge(user.age);

            setFound(true);

        } catch {
            setMessage("User not found.");
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();

        const user = { name, email, phone, address, age: Number(age) };

        try {
            const response = await fetch(
                `${API_URL}/users/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message);
                return;
            }

            setMessage("User updated.");

        } catch {
            setMessage("Cannot update user.");
        }
    };

    return (
        <div className="page">

            <div className="form">

                <h1>Update User</h1>
                {message && <h2 className="message">{message}</h2>}

                {!found && (
                    <form onSubmit={findUser}>

                        <input type="text" placeholder="Enter User ID" value={id} onChange={(e) => setId(e.target.value)} required />

                        <button type="submit">
                            Find User
                        </button>

                    </form>
                )}

                {found && (
                    <form onSubmit={updateUser}>

                        <input type="text" value={id} disabled />

                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />

                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

                        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />

                        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />

                        <button type="submit"> Update User </button>

                    </form>
                )}

            </div>

        </div>
    );
}

export default UpdateUser;