import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import API from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LogOut,
  History as HistoryIcon,
  LogIn,
  UserPlus,
  X
} from "lucide-react";

Modal.setAppElement("#root");

export default function Novabar() {

  const [modalType, setModalType] = useState(null);

  const [username, setusername] = useState(
  localStorage.getItem("username") || null
);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // LOGIN / REGISTER
 const handleSubmit = async (e) => {

  e.preventDefault();

  setLoading(true);

  try {

    // LOGIN
    if (modalType === "login") {

      const res = await API.post("/login", {
        email: data.email,
        password: data.password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // GET USERNAME SAFELY
      const userName =
        res.data?.user?.name ||
        "User";

      // SAVE USERNAME
      localStorage.setItem(
        "username",
        userName
      );

      // UPDATE STATE
      setusername(userName);

      // CLOSE MODAL
      setModalType(null);

      // CLEAR FORM
      setData({
        name: "",
        email: "",
        password: "",
      });

      alert("Login successful");

      // FORCE UI UPDATE
      setTimeout(() => {
        navigate("/");
      }, 300);

    }

    // REGISTER
    else {

      await API.post("/register", data);

      alert("Registered successfully");

      setModalType("login");

      setData({
        name: "",
        email: "",
        password: "",
      });

    }

  } catch (err) {

    console.log(err);

    const message =
      err.response?.data?.message;

    if (
      modalType === "register" &&
      message === "User already exists"
    ) {

      alert(
        "User already exists. Please login."
      );

      setModalType("login");

    }

    else if (
      modalType === "login"
    ) {

      alert(
        "Invalid credentials"
      );

    }

    else {

      alert(
        message ||
        "Something went wrong"
      );

    }

  } finally {

    setLoading(false);

  }
};
  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("username");

    setusername(null);
  };

  // LOAD USER
  useEffect(() => {

    const storedUser =
      localStorage.getItem("username");

    if (storedUser) {

      setusername(storedUser);

    }

  }, []);

  return (

    <>
    
      {/* BACKGROUND GLOW */}
      <div
        style={{
          position: "fixed",
          top: "-200px",
          left: "-200px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(0,153,255,0.18), transparent)",
          filter: "blur(80px)",
          zIndex: -1,
        }}
      />

      {/* NAVBAR */}
      <motion.div

        initial={{ y: -80, opacity: 0 }}

        animate={{ y: 0, opacity: 1 }}

        transition={{ duration: 0.5 }}

        style={{
          width: "100%",
          padding: "18px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(15,15,20,0.7)",
          backdropFilter: "blur(18px)",
          borderBottom:
            "1px solid rgba(255,255,255,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 999,
        }}
      >

        {/* LOGO */}
        <motion.h1

          whileHover={{ scale: 1.05 }}

          style={{
            color: "white",
            fontSize: "28px",
            fontWeight: "bold",
            background:
              "linear-gradient(to right,#00d4ff,#8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
          }}
        >
          NovaVoice AI
        </motion.h1>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >

          {!username ?(

            <>

              {/* LOGIN */}
              <motion.button

                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 0 20px rgba(0,212,255,0.5)",
                }}

                whileTap={{ scale: 0.95 }}

                onClick={() =>
                  setModalType("login")
                }

                style={btnGhost}
              >
                <LogIn size={18} />
                Login
              </motion.button>

              {/* REGISTER */}
              <motion.button

                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 0 20px rgba(139,92,246,0.5)",
                }}

                whileTap={{ scale: 0.95 }}

                onClick={() =>
                  setModalType("register")
                }

                style={btnPrimary}
              >
                <UserPlus size={18} />
                Register
              </motion.button>

            </>

          ) : (

            <>

              {/* USER */}
              <motion.button

                whileHover={{ scale: 1.05 }}

                style={userBtn}
              >
                <User size={18} />
                {username}
              </motion.button>

              {/* HISTORY */}
              <motion.button

                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 0 18px rgba(0,212,255,0.35)",
                }}

                whileTap={{ scale: 0.95 }}

                onClick={() =>
                  navigate("/History")
                }

                style={btnGhost}
              >
                <HistoryIcon size={18} />
                History
              </motion.button>

              {/* LOGOUT */}
              <motion.button

                whileHover={{
                  scale: 1.05,
                  background: "#ff3b5f",
                }}

                whileTap={{ scale: 0.95 }}

                onClick={handleLogout}

                style={btnDanger}
              >
                <LogOut size={18} />
                Logout
              </motion.button>

            </>

          )}

        </div>

      </motion.div>

      {/* MODAL */}
      <AnimatePresence>

        {modalType && (

          <Modal
            isOpen={modalType !== null}
            onRequestClose={() =>
              setModalType(null)
            }
            style={{
              overlay: {
                backgroundColor:
                  "rgba(0,0,0,0.75)",
                backdropFilter: "blur(10px)",
                zIndex: 1000,
              },
              content: {
                background:
                  "rgba(20,20,25,0.95)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                maxWidth: "420px",
                margin: "auto",
                padding: "35px",
                inset: 0,
                height: "fit-content",
                boxShadow:
                  "0 0 40px rgba(0,212,255,0.15)",
              },
            }}
          >

            <motion.div

              initial={{
                opacity: 0,
                scale: 0.9,
                y: 40,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.9,
              }}

              transition={{ duration: 0.3 }}
            >

              {/* CLOSE */}
              <button

                onClick={() =>
                  setModalType(null)
                }

                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <X />
              </button>

              {/* TITLE */}
              <h2
                style={{
                  color: "white",
                  marginBottom: "25px",
                  textAlign: "center",
                  fontSize: "32px",
                  fontWeight: "bold",
                  background:
                    "linear-gradient(to right,#00d4ff,#8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {modalType === "login"
                  ? "Welcome Back"
                  : "Create Account"}
              </h2>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >

                {modalType === "register" && (
                  <input
                    type="text"
                    placeholder="Name"
                    value={data.name}
                    onChange={(e) =>
                      setData({
                        ...data,
                        name: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />
                )}

                <input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      email: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({
                      ...data,
                      password: e.target.value,
                    })
                  }
                  style={inputStyle}
                />

                {/* SUBMIT */}
                <motion.button

                  whileHover={{
                    scale: 1.03,
                  }}

                  whileTap={{
                    scale: 0.96,
                  }}

                  type="submit"

                  disabled={loading}

                  style={submitBtn}
                >

                  {loading ? (
                    <div style={spinner}></div>
                  ) : (
                    <>
                      {modalType === "login"
                        ? "Login"
                        : "Register"}
                    </>
                  )}

                </motion.button>

              </form>

              {/* SWITCH */}
              <p
                style={{
                  color: "#aaa",
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >

                {modalType === "login" ? (
                  <>
                    Don’t have account?{" "}
                    <span
                      onClick={() =>
                        setModalType("register")
                      }
                      style={switchText}
                    >
                      Register
                    </span>
                  </>
                ) : (
                  <>
                    Already have account?{" "}
                    <span
                      onClick={() =>
                        setModalType("login")
                      }
                      style={switchText}
                    >
                      Login
                    </span>
                  </>
                )}

              </p>

            </motion.div>

          </Modal>

        )}

      </AnimatePresence>

    </>
  );
}

// BUTTON STYLES

const btnPrimary = {
  background:
    "linear-gradient(to right,#00d4ff,#8b5cf6)",
  color: "white",
  border: "none",
  padding: "12px 22px",
  borderRadius: "14px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "600",
};

const btnGhost = {
  background: "rgba(255,255,255,0.05)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.1)",
  padding: "12px 22px",
  borderRadius: "14px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "600",
};

const btnDanger = {
  background: "#ff4d6d",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "14px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "600",
};

const userBtn = {
  background:
    "linear-gradient(to right,#111827,#1f2937)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.08)",
  padding: "12px 22px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  outline: "none",
  fontSize: "15px",
};

const submitBtn = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background:
    "linear-gradient(to right,#00d4ff,#8b5cf6)",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
  marginTop: "10px",
};

const switchText = {
  color: "#00d4ff",
  cursor: "pointer",
  fontWeight: "600",
};

const spinner = {
  width: "20px",
  height: "20px",
  border: "3px solid rgba(255,255,255,0.3)",
  borderTop: "3px solid white",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  margin: "auto",
};