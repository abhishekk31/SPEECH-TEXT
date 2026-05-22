import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  Mic,
  Square,
  RotateCcw,
  Copy,
  Save,
  Volume2,
  Sparkles
} from "lucide-react";

import { motion } from "framer-motion";

import {
  savehistory,
  gethistory
} from "../utils/Savehistory";

export default function Mainui() {

  const [history, sethistory] = useState([]);

  const [saving, setSaving] = useState(false);

  const [copyText, setCopyText] =
    useState("Copy");

  // SPEECH RECOGNITION
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    listening
  } = useSpeechRecognition();

  // START LISTENING
  const startListening = () => {

    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });

  };

  // SAVE HISTORY
  const handleSave = async () => {

    if (!transcript) return;

    const token =
      localStorage.getItem("token");

    if (!token) {

      alert("Please login first");

      return;

    }

    setSaving(true);

    try {

      const res =
        await savehistory(transcript);

      console.log(res.data);

      alert("Saved Successfully");

    } catch (error) {

      console.error(error);

      alert("Failed to save");

    } finally {

      setSaving(false);

    }
  };

  // COPY TEXT
  const handleCopy = async () => {

    await navigator.clipboard.writeText(
      transcript
    );

    setCopyText("Copied!");

    setTimeout(() => {

      setCopyText("Copy");

    }, 2000);
  };

  // LOAD HISTORY
  useEffect(() => {

    const loadHistory = async () => {

      try {

        const res = await gethistory();

        sethistory(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    loadHistory();

  }, []);

  // BROWSER SUPPORT
  if (!browserSupportsSpeechRecognition) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        Browser does not support Speech Recognition
      </div>

    );
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#020617,#0f172a)",
        color: "white",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* GLOW EFFECT */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          left: "-150px",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.18), transparent)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      {/* MAIN CONTAINER */}
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
          maxWidth: "850px",
          margin: "auto",
          background:
            "rgba(15,23,42,0.75)",
          border:
            "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          borderRadius: "30px",
          padding: "40px",
          position: "relative",
          zIndex: 1,
          boxShadow:
            "0 0 50px rgba(0,212,255,0.08)",
        }}
      >

        {/* TITLE */}
        <motion.h1

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
            fontSize: "52px",
            fontWeight: "800",
            textAlign: "center",
            marginBottom: "10px",
            background:
              "linear-gradient(to right,#00d4ff,#8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:
              "transparent",
          }}
        >
          Speech to Text AI
        </motion.h1>

        {/* SUBTITLE */}
        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "40px",
            fontSize: "18px",
          }}
        >
          Turn your voice into text instantly
          using AI powered speech recognition.
        </p>

        {/* STATUS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "25px",
          }}
        >

          <div
            style={{
              padding: "10px 18px",
              borderRadius: "50px",
              background: listening
                ? "rgba(239,68,68,0.18)"
                : "rgba(0,212,255,0.12)",
              color: listening
                ? "#ef4444"
                : "#00d4ff",
              border:
                "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "600",
            }}
          >

            <Volume2 size={18} />

            {listening
              ? "Listening..."
              : "Ready"}

          </div>

        </div>

        {/* TEXT BOX */}
        <motion.div

          whileHover={{
            scale: 1.01
          }}

          style={{
            minHeight: "250px",
            background:
              "rgba(255,255,255,0.04)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "25px",
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#e2e8f0",
            overflowY: "auto",
            marginBottom: "30px",
            boxShadow:
              "inset 0 0 20px rgba(255,255,255,0.02)",
          }}
        >

          {transcript ? (
            transcript
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "180px",
                color: "#64748b",
              }}
            >

              <Sparkles
                size={42}
                color="#00d4ff"
              />

              <p
                style={{
                  marginTop: "15px"
                }}
              >
                Your speech will appear here...
              </p>

            </div>
          )}

        </motion.div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >

          {/* START */}
          <motion.button

            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 25px rgba(0,212,255,0.35)"
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={startListening}

            style={primaryBtn}
          >
            <Mic size={18} />
            Start
          </motion.button>

          {/* STOP */}
          <motion.button

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={
              SpeechRecognition.stopListening
            }

            style={dangerBtn}
          >
            <Square size={18} />
            Stop
          </motion.button>

          {/* RESET */}
          <motion.button

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={resetTranscript}

            style={ghostBtn}
          >
            <RotateCcw size={18} />
            Reset
          </motion.button>

          {/* COPY */}
          <motion.button

            whileHover={{
              scale: 1.05
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={handleCopy}

            style={ghostBtn}
          >
            <Copy size={18} />
            {copyText}
          </motion.button>

          {/* SAVE */}
          <motion.button

            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 25px rgba(139,92,246,0.35)"
            }}

            whileTap={{
              scale: 0.95
            }}

            onClick={handleSave}

            style={saveBtn}
          >

            {saving ? (
              <div style={spinner}></div>
            ) : (
              <>
                <Save size={18} />
                Save
              </>
            )}

          </motion.button>

        </div>

      </motion.div>

    </div>
  );
}

// BUTTONS
const primaryBtn = {
  background:
    "linear-gradient(to right,#00d4ff,#3b82f6)",
  color: "white",
  border: "none",
  padding: "14px 24px",
  borderRadius: "16px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: "700",
};

const dangerBtn = {
  background:
    "linear-gradient(to right,#ef4444,#f97316)",
  color: "white",
  border: "none",
  padding: "14px 24px",
  borderRadius: "16px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: "700",
};

const ghostBtn = {
  background:
    "rgba(255,255,255,0.05)",
  color: "white",
  border:
    "1px solid rgba(255,255,255,0.08)",
  padding: "14px 24px",
  borderRadius: "16px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: "700",
};

const saveBtn = {
  background:
    "linear-gradient(to right,#8b5cf6,#00d4ff)",
  color: "white",
  border: "none",
  padding: "14px 24px",
  borderRadius: "16px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: "700",
};

const spinner = {
  width: "22px",
  height: "22px",
  border:
    "3px solid rgba(255,255,255,0.3)",
  borderTop:
    "3px solid white",
  borderRadius: "50%",
  animation:
    "spin 1s linear infinite",
};