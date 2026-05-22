import React from "react";
import { motion } from "framer-motion";

export default function Footer() {

  return (

    <footer
      style={{
        background:
          "linear-gradient(to bottom,#020617,#0f172a)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
        marginTop: "0px",
        borderTop:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >

      {/* GLOW EFFECT */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-120px",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.18), transparent)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      {/* MAIN CONTAINER */}
      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        whileInView={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.6
        }}

        viewport={{
          once: true
        }}

        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "0 20px 50px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "40px",
          position: "relative",
          zIndex: 1,
        }}
      >

        {/* LEFT */}
        <div>

          <motion.h2

            whileHover={{
              scale: 1.03
            }}

            style={{
              fontSize: "34px",
              fontWeight: "800",
              marginBottom: "12px",
              background:
                "linear-gradient(to right,#00d4ff,#8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:
                "transparent",
            }}
          >
            Abhishek Sasane
          </motion.h2>

          <p
            style={{
              color: "#94a3b8",
              lineHeight: "1.8",
              fontSize: "16px",
            }}
          >
            Full Stack MERN Developer building
            modern AI powered web applications
            with responsive UI/UX experiences.
          </p>

        </div>

        {/* CENTER */}
        <div>

          <p
            style={{
              color: "white",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            abhisheksasane212@gmail.com
          </p>

          <motion.div

            whileHover={{
              scale: 1.02
            }}

            style={{
              background:
                "rgba(255,255,255,0.04)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "20px",
              backdropFilter: "blur(20px)",
            }}
          >

            <h3
              style={{
                color: "white",
                marginBottom: "12px",
                fontSize: "18px",
              }}
            >
              Privacy & Security
            </h3>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.8",
                fontSize: "15px",
              }}
            >
              Your speech data remains secure
              and private. We never share your
              information with third parties.
            </p>

          </motion.div>

        </div>

        {/* RIGHT */}
        <div>

          <h3
            style={{
              color: "white",
              marginBottom: "20px",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            Connect With Me
          </h3>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap"
            }}
          >

            <motion.a

              whileHover={{
                scale: 1.1,
                boxShadow:
                  "0 0 25px rgba(0,212,255,0.35)"
              }}

              whileTap={{
                scale: 0.95
              }}

              href="https://linkedin.com"

              target="_blank"

              rel="noreferrer"

              style={socialBtn}
            >
              LinkedIn
            </motion.a>

            <motion.a

              whileHover={{
                scale: 1.1,
                boxShadow:
                  "0 0 25px rgba(139,92,246,0.35)"
              }}

              whileTap={{
                scale: 0.95
              }}

              href="mailto:abhisheksasane212@gmail.com"

              style={socialBtn}
            >
              Email
            </motion.a>

          </div>

          {/* AI TAG */}
          <div
            style={{
              marginTop: "28px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background:
                "rgba(255,255,255,0.04)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              borderRadius: "50px",
              padding: "12px 18px",
              color: "#cbd5e1",
              fontSize: "14px",
            }}
          >

            Powered by AI & MERN Stack

          </div>

        </div>

      </motion.div>

      {/* BOTTOM */}
      <motion.div

        initial={{
          opacity: 0
        }}

        whileInView={{
          opacity: 1
        }}

        transition={{
          delay: 0.2
        }}

        viewport={{
          once: true
        }}

        style={{
          borderTop:
            "1px solid rgba(255,255,255,0.06)",
          padding: "22px",
          textAlign: "center",
          color: "#64748b",
          fontSize: "15px",
          position: "relative",
          zIndex: 1,
        }}
      >

        © 2026 Abhishek Sasane · All Rights Reserved

      </motion.div>

    </footer>
  );
}

// BUTTON STYLE
const socialBtn = {
  padding: "14px 24px",
  borderRadius: "18px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "rgba(255,255,255,0.05)",
  border:
    "1px solid rgba(255,255,255,0.08)",
  color: "white",
  textDecoration: "none",
  backdropFilter: "blur(20px)",
  transition: "0.3s",
  fontWeight: "600",
};