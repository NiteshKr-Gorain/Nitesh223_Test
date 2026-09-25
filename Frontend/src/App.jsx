import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./pages/Users";


import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";
import DeleteUser from "./pages/DeleteUser";
import "./App.css";

function App() {
    return (
        <>
          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route path="/" element={<Users />} />
                <Route path="/users" element={<Users />} />
                <Route path="/create" element={<CreateUser />} />
                <Route path="/update" element={<UpdateUser />} />
                <Route path="/delete" element={<DeleteUser />} />
             </Routes>
          </BrowserRouter>
        </>
    );
}

export default App;