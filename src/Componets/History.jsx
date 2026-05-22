import React, { useEffect, useState } from "react";

import {
  gethistory,
  deletehistory
} from "../utils/Savehistory.js";

import {
  Trash2,
  Clock3,
  History as HistoryIcon,
  Sparkles
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

export default function History() {

  const [history, setHistory] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState(null);

  // FETCH HISTORY
  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await gethistory();

        setHistory(res.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, []);

  // DELETE
  const handledelete = async (id) => {

    setDeletingId(id);

    try {

      await deletehistory(id);

      setHistory((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

    } catch (e) {

      alert("Error occurred in database");

    } finally {

      setDeletingId(null);

    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#020617,#0f172a)",
        padding: "50px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* GLOW EFFECT */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.18), transparent)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      {/* CONTAINER */}
      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.5
        }}

        style={{
          maxWidth: "950px",
          margin: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >

        {/* TITLE */}
        <motion.div

          initial={{
            opacity: 0,
            y: -20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: 0.2
          }}

          style={{
            textAlign: "center",
            marginBottom: "45px",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "18px",
            }}
          >

            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "30px",
                background:
                  "linear-gradient(to right,#00d4ff,#8b5cf6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow:
                  "0 0 35px rgba(0,212,255,0.25)",
              }}
            >

              <HistoryIcon
                size={42}
                color="white"
              />

            </div>

          </div>

          <h1
            style={{
              fontSize: "52px",
              fontWeight: "800",
              background:
                "linear-gradient(to right,#00d4ff,#8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:
                "transparent",
              marginBottom: "12px",
            }}
          >
            Your History
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
            }}
          >
            View and manage your AI generated
            speech transcripts.
          </p>

        </motion.div>

        {/* LOADING */}
        {loading ? (

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >

            <div style={spinner}></div>

          </div>

        ) : history.length === 0 ? (

          /* EMPTY STATE */
          <motion.div

            initial={{
              opacity: 0,
              scale: 0.9
            }}

            animate={{
              opacity: 1,
              scale: 1
            }}

            style={{
              background:
                "rgba(15,23,42,0.75)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: "30px",
              padding: "60px 30px",
              textAlign: "center",
              backdropFilter: "blur(20px)",
            }}
          >

            <Sparkles
              size={52}
              color="#00d4ff"
            />

            <h2
              style={{
                color: "white",
                marginTop: "18px",
                fontSize: "30px",
                fontWeight: "700",
              }}
            >
              No History Found
            </h2>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "12px",
                lineHeight: "1.8",
              }}
            >
              Your saved speech transcripts
              will appear here.
            </p>

          </motion.div>

        ) : (

          /* HISTORY LIST */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
            }}
          >

            <AnimatePresence>

              {history.map((item, index) => (

                <motion.div

                  key={item._id}

                  initial={{
                    opacity: 0,
                    y: 40
                  }}

                  animate={{
                    opacity: 1,
                    y: 0
                  }}

                  exit={{
                    opacity: 0,
                    scale: 0.9
                  }}

                  transition={{
                    delay: index * 0.08
                  }}

                  whileHover={{
                    scale: 1.015,
                    borderColor:
                      "rgba(0,212,255,0.3)",
                    boxShadow:
                      "0 0 30px rgba(0,212,255,0.08)",
                  }}

                  style={{
                    background:
                      "rgba(15,23,42,0.75)",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "28px",
                    padding: "28px",
                    backdropFilter: "blur(18px)",
                    transition: "0.3s",
                  }}
                >

                  {/* TEXT */}
                  <p
                    style={{
                      color: "#e2e8f0",
                      fontSize: "18px",
                      lineHeight: "1.9",
                      marginBottom: "25px",
                    }}
                  >
                    {item.text}
                  </p>

                  {/* FOOTER */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "18px",
                    }}
                  >

                    {/* DATE */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: "#94a3b8",
                        fontSize: "14px",
                      }}
                    >

                      <Clock3
                        size={16}
                        color="#00d4ff"
                      />

                      {new Date(
                        item.date
                      ).toLocaleString()}

                    </div>

                    {/* DELETE BUTTON */}
                    <motion.button

                      whileHover={{
                        scale: 1.05,
                        background:
                          "#ef4444"
                      }}

                      whileTap={{
                        scale: 0.95
                      }}

                      onClick={() =>
                        handledelete(
                          item._id
                        )
                      }

                      style={deleteBtn}
                    >

                      {deletingId ===
                      item._id ? (

                        <div
                          style={smallSpinner}
                        ></div>

                      ) : (
                        <>
                          <Trash2
                            size={18}
                          />
                          Delete
                        </>
                      )}

                    </motion.button>

                  </div>

                </motion.div>

              ))}

            </AnimatePresence>

          </div>

        )}

      </motion.div>

    </div>
  );
}

// DELETE BUTTON
const deleteBtn = {
  background:
    "linear-gradient(to right,#ef4444,#f97316)",
  border: "none",
  padding: "13px 22px",
  borderRadius: "16px",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

// BIG SPINNER
const spinner = {
  width: "60px",
  height: "60px",
  border:
    "5px solid rgba(255,255,255,0.15)",
  borderTop:
    "5px solid #00d4ff",
  borderRadius: "50%",
  animation:
    "spin 1s linear infinite",
};

// SMALL SPINNER
const smallSpinner = {
  width: "20px",
  height: "20px",
  border:
    "3px solid rgba(255,255,255,0.3)",
  borderTop:
    "3px solid white",
  borderRadius: "50%",
  animation:
    "spin 1s linear infinite",
};