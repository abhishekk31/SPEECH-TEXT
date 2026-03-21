import React from "react";
import "../Componets/Maindev.css";
import Modal from "react-modal";
import { useState } from "react";
import API from "../utils/api.js";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'




export default function Novabar() {
  const [modalType, setModalType] = useState(null);
  const [username, setusername] = useState(null);
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalType === "login") {
        const res = await API.post("/login", {
          email: data.email,
          password: data.password,
        });

        // save token
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.name);
        console.log("Full Data", res.data)
        setusername(res.data.user.name);

        alert("Login successful");
      } else {

        await API.post("/register", data);

        alert("Registered successfully");
      }

      setData({
        name: "",
        email: "",
        password: "",



      });

      // close modal
      setModalType(null);
    }
    catch (err) {
      const message = err.response?.data?.message;

      if (modalType === "register" && message === "User already exists") {
        alert("User already exists. Please login.");
        setModalType("login");
      } else if (modalType === "login") {
        alert("Invalid credentials. Please try again.");
      } else {
        alert(message || "Something went wrong");
      }
    };}





    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setusername(null);
    };





    useEffect(() => {
      const storedUser = localStorage.getItem("username");
      if (storedUser) {
        setusername(storedUser);
      }
    }, []);
    return (
      <div className="Nav">
        {!username ? (
          <>
            <button onClick={() => setModalType("login")}>Login</button>
            <button onClick={() => setModalType("register")}>Register</button>
          </>
        ) : (
          <>
            <button className="user-btn"><i className="fa-solid fa-user" style={{ marginRight: "8px" }}></i>{username}</button>


            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate('/History')}>Histroy</button>
          </>
        )}

        <Modal
          isOpen={modalType !== null}
          onRequestClose={() => setModalType(null)}
          className="Logmodal"
          overlayClassName="Overlay"
        >
          <div className="login-box">
            <span className="close" onClick={() => setModalType(null)}>
              ×
            </span>

            <h2>{modalType === "login" ? "Login" : "Register"}</h2>

            <form className="login-form" onSubmit={handleSubmit}>
              {modalType === "register" && (
                <input
                  type="text"
                  placeholder="Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />

              <input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <p className="switch-text">
                {modalType === "login" ? (
                  <>
                    Don’t have an account?{" "}
                    <span onClick={() => setModalType("register")}>
                      Register
                    </span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span onClick={() => setModalType("login")}>
                      Login
                    </span>
                  </>
                )}
              </p>

              <button type="submit" className="login-btn">
                {modalType === "login" ? "Login" : "Register"}
              </button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
