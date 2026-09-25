import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
 function CreateUser() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {id,name,email,phone,address,age: Number(age)};

        try {
            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message );
                return;
            }

            setMessage("User added.");

        } catch {
            setMessage("Cannot add user.");
        }
    };

    return (
        <div className="page">
            <div className="form">
                <h1>Create User</h1>
                {message && <h2 className="message">{message}</h2>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} required />
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />

                    <button type="submit"> Create User </button>

                </form>

            </div>

        </div>
    );
}

export default CreateUser;