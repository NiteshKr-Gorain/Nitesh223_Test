import { useState , useEffect } from "react";

const Users = () => {
    const [user, setUser] = useState([]);
    
        useEffect(() => {
            const getUsers = async () => {
                const response = await fetch(
                    "http://localhost:5000/users"
                );
    
                const data = await response.json();
    
                setUser(data);
            };
    
            getUsers();
        }, []);
  return (
    <div>{user.map(() => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <h2>{user.email}</h2>
                    <h2>{user.phone}</h2>
                    <h2>{user.address}</h2>
                    <h2>{user.age}</h2>
                    
                </div>
            ))}

    </div>
  )
}

export default Users