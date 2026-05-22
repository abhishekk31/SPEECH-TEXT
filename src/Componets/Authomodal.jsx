import React, { useState } from "react";
import API from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus
} from "lucide-react";

export default function AuthModal({ type, onClose }) {

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      if (type === "login") {

        const res = await API.post(
          "/auth/login",
          data
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        alert("Login success");

        window.location.reload();

      } else {

        await API.post(
          "/auth/register",
          data
        );

        alert("Registered successfully");

      }

    } catch (err) {

      alert(
        err.response?.data?.message || "Error"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <AnimatePresence>

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        exit={{ opacity: 0 }}

        transition={{ duration: 0.25 }}

        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          padding: "20px"
        }}
      >

        {/* GLOW */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.18), transparent)",
            filter: "blur(80px)",
            zIndex: -1
          }}
        />

        {/* MODAL BOX */}
        <motion.div

          initial={{
            opacity: 0,
            scale: 0.85,
            y: 40
          }}

          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}

          exit={{
            opacity: 0,
            scale: 0.9
          }}

          transition={{
            duration: 0.35
          }}

          style={{
            width: "100%",
            maxWidth: "420px",
            background:
              "rgba(15,15,20,0.95)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "28px",
            padding: "35px",
            position: "relative",
            overflow: "hidden",
            boxShadow:
              "0 0 40px rgba(0,212,255,0.15)"
          }}
        >

          {/* CLOSE */}
          <button

            onClick={onClose}

            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              background: "transparent",
              border: "none",
              color: "#aaa",
              cursor: "pointer"
            }}
          >
            <X size={24} />
          </button>

          {/* TITLE */}
          <motion.h2

            initial={{ opacity: 0, y: -20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.1 }}

            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "34px",
              fontWeight: "700",
              background:
                "linear-gradient(to right,#00d4ff,#8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            {type === "login"
              ? "Welcome Back"
              : "Create Account"}
          </motion.h2>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px"
            }}
          >

            {/* NAME */}
            {type === "register" && (

              <div style={inputWrapper}>

                <User
                  size={18}
                  color="#00d4ff"
                />

                <input
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) =>
                    setData({
                      ...data,
                      name: e.target.value
                    })
                  }
                  style={inputStyle}
                />

              </div>

            )}

            {/* EMAIL */}
            <div style={inputWrapper}>

              <Mail
                size={18}
                color="#00d4ff"
              />

              <input
                type="email"
                placeholder="Email Address"
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value
                  })
                }
                style={inputStyle}
              />

            </div>

            {/* PASSWORD */}
            <div style={inputWrapper}>

              <Lock
                size={18}
                color="#00d4ff"
              />

              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value
                  })
                }
                style={inputStyle}
              />

            </div>

            {/* SUBMIT BUTTON */}
            <motion.button

              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 0 25px rgba(0,212,255,0.35)"
              }}

              whileTap={{
                scale: 0.96
              }}

              type="submit"

              disabled={loading}

              style={submitBtn}
            >

              {loading ? (

                <div style={spinner}></div>

              ) : (

                <>

                  {type === "login" ? (
                    <>
                      <LogIn size={18} />
                      Login
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Register
                    </>
                  )}

                </>

              )}

            </motion.button>

          </form>

          {/* FOOTER */}
          <motion.p

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{ delay: 0.2 }}

            style={{
              marginTop: "22px",
              textAlign: "center",
              color: "#999",
              fontSize: "14px"
            }}
          >

            {type === "login"
              ? "Secure AI powered authentication"
              : "Create your futuristic AI account"}

          </motion.p>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}

// INPUT WRAPPER
const inputWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
  padding: "14px 16px",
  transition: "0.3s"
};

// INPUT STYLE
const inputStyle = {
  width: "100%",
  background: "transparent",
  border: "none",
  outline: "none",
  color: "white",
  fontSize: "15px"
};

// BUTTON
const submitBtn = {
  width: "100%",
  padding: "15px",
  borderRadius: "16px",
  border: "none",
  background:
    "linear-gradient(to right,#00d4ff,#8b5cf6)",
  color: "white",
  fontWeight: "700",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px"
};

// LOADER
const spinner = {
  width: "22px",
  height: "22px",
  border: "3px solid rgba(255,255,255,0.3)",
  borderTop: "3px solid white",
  borderRadius: "50%",
  animation: "spin 1s linear infinite"
};