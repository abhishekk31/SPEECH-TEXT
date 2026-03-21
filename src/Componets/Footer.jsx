import React from "react";
import "../Componets/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">
          <h2>Abhishek Sasane</h2>
          <p>Full Stack Developer (MERN)</p>
        </div>

        {/* CENTER */}
        <div className="footer-center">
          <p>
            <i className="fas fa-envelope"></i>
            abhisheksasane212@gmail.com
          </p>

          <p className="privacy">
            This app respects your privacy. Your data is securely stored and not shared.
          </p>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <a href="#"><i className="fab fa-github"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
          <a href="mailto:abhisheksasane212@gmail.com">
            <i className="fas fa-paper-plane"></i>
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Abhishek Sasane | All Rights Reserved
      </div>
    </footer>
  );
}