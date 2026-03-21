import React, { useState } from "react";
import API from "../utils/api";
import '../Componets/Authomodal.css'
export default function AuthModal({ type, onClose }) {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (type === "login") {
        const res = await API.post("/auth/login", data);
        localStorage.setItem("token", res.data.token);
        alert("Login success");
        window.location.reload();
      } else {
        await API.post("/auth/register", data);
        alert("Registered successfully");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h2>{type === "login" ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          
          {type === "register" && (
            <input placeholder="Name"
              onChange={(e)=>setData({...data,name:e.target.value})}/>
          )}

          <input placeholder="Email"
            onChange={(e)=>setData({...data,email:e.target.value})}/>

          <input type="password" placeholder="Password"
            onChange={(e)=>setData({...data,password:e.target.value})}/>

          <button type="submit">
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}