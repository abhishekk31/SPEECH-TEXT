/**
 * SpeechApp.jsx — All-in-one Speech-to-Text Application
 *
 * Includes:
 *  - Novabar (nav with Login/Register modal + Logout)
 *  - AuthModal (login / register form)
 *  - History (view & delete past transcriptions)
 *  - Main speech-to-text UI
 *
 * Drop-in requirements:
 *  - npm install react-modal react-router-dom
 *  - Provide  src/utils/api.js  (axios instance)
 *  - Provide  src/utils/Savehistory.js  (gethistory, deletehistory, savehistory)
 *  - Mount Modal.setAppElement('#root') once in index.jsx
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import Modal from "react-modal";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import API from "../utils/api.js";
import { gethistory, deletehistory, savehistory } from "../utils/Savehistory.js";

/* ─────────────────────────────────────────
   DESIGN TOKENS & GLOBAL STYLES (injected)
───────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #0a0a0f;
    --surface:   #13131a;
    --surface2:  #1c1c28;
    --border:    rgba(255,255,255,0.07);
    --accent:    #00e5ff;
    --accent2:   #7b61ff;
    --danger:    #ff4d6d;
    --text:      #e8e8f0;
    --muted:     #6b6b80;
    --radius:    14px;
    --glow:      0 0 24px rgba(0,229,255,0.18);
    --font-head: 'Syne', sans-serif;
    --font-mono: 'DM Mono', monospace;
  }

  html, body, #root {
    height: 100%;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-mono);
    -webkit-font-smoothing: antialiased;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 99px; }

  /* ── NAV ── */
  .nova-nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px;
    height: 62px;
    background: rgba(10,10,15,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nova-brand {
    font-family: var(--font-head);
    font-size: 1.35rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .nova-brand span { opacity: 0.55; }
  .nav-actions { display: flex; gap: 10px; align-items: center; }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 18px;
    border: none; border-radius: 8px;
    font-family: var(--font-mono); font-size: 0.8rem; font-weight: 500;
    cursor: pointer; transition: all 0.18s;
    white-space: nowrap;
  }
  .btn-ghost {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
  }
  .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

  .btn-primary {
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    color: #0a0a0f; font-weight: 700;
  }
  .btn-primary:hover { filter: brightness(1.1); box-shadow: var(--glow); }

  .btn-danger {
    background: rgba(255,77,109,0.12);
    border: 1px solid rgba(255,77,109,0.3);
    color: var(--danger);
  }
  .btn-danger:hover { background: rgba(255,77,109,0.22); }

  .btn-user {
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 99px;
    padding: 6px 16px;
  }

  .btn:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ── MODAL ── */
  .overlay-modal {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.72);
    backdrop-filter: blur(8px);
    z-index: 999;
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn 0.2s ease;
  }
  .auth-box {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px 32px;
    width: 100%; max-width: 400px;
    position: relative;
    box-shadow: 0 32px 80px rgba(0,0,0,0.6), var(--glow);
    animation: slideUp 0.28s cubic-bezier(0.22,1,0.36,1);
  }
  .auth-box h2 {
    font-family: var(--font-head);
    font-size: 1.6rem; font-weight: 800;
    margin-bottom: 28px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .auth-form { display: flex; flex-direction: column; gap: 14px; }
  .auth-input {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 13px 16px;
    color: var(--text);
    font-family: var(--font-mono); font-size: 0.9rem;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .auth-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(0,229,255,0.1);
  }
  .auth-input::placeholder { color: var(--muted); }
  .close-btn {
    position: absolute; top: 16px; right: 18px;
    background: none; border: none;
    color: var(--muted); font-size: 1.4rem;
    cursor: pointer; line-height: 1;
    transition: color 0.15s;
  }
  .close-btn:hover { color: var(--text); }
  .switch-text {
    font-size: 0.8rem; color: var(--muted); text-align: center; margin-top: 4px;
  }
  .switch-text span {
    color: var(--accent); cursor: pointer; text-decoration: underline;
  }

  /* ── SPINNER ── */
  .spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.15);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  .spinner-lg {
    width: 40px; height: 40px;
    border-width: 3px;
  }
  .spinner-center {
    display: flex; justify-content: center; align-items: center;
    padding: 60px 0;
  }

  /* ── MAIN LAYOUT ── */
  .app-shell {
    min-height: 100vh;
    display: flex; flex-direction: column;
  }
  .main-content {
    flex: 1;
    display: flex; flex-direction: column; align-items: center;
    padding: 48px 20px 80px;
    gap: 32px;
  }

  /* ── HERO ── */
  .hero-title {
    font-family: var(--font-head);
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 800;
    text-align: center;
    line-height: 1.1;
    letter-spacing: -1.5px;
  }
  .hero-title .gradient {
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-sub {
    color: var(--muted); font-size: 1rem; text-align: center; max-width: 480px;
  }

  /* ── MIC CARD ── */
  .mic-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 40px 36px;
    width: 100%; max-width: 620px;
    display: flex; flex-direction: column; align-items: center; gap: 28px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }
  .mic-ring {
    position: relative;
    width: 100px; height: 100px;
    display: flex; align-items: center; justify-content: center;
  }
  .mic-ring::before {
    content: '';
    position: absolute; inset: -8px;
    border-radius: 50%;
    border: 2px solid transparent;
    background: linear-gradient(var(--bg), var(--bg)) padding-box,
                linear-gradient(135deg, var(--accent), var(--accent2)) border-box;
    transition: all 0.3s;
  }
  .mic-ring.listening::before {
    animation: pulse-ring 1.2s ease-in-out infinite;
  }
  .mic-btn {
    width: 82px; height: 82px; border-radius: 50%;
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem;
    transition: all 0.22s;
    position: relative; z-index: 1;
    background: linear-gradient(135deg, var(--accent2), var(--accent));
    box-shadow: 0 8px 32px rgba(0,229,255,0.25);
  }
  .mic-btn:hover { transform: scale(1.06); box-shadow: 0 12px 40px rgba(0,229,255,0.4); }
  .mic-btn.active {
    background: linear-gradient(135deg, var(--danger), #ff9a3c);
    box-shadow: 0 8px 32px rgba(255,77,109,0.35);
  }
  .mic-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  .status-badge {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.8rem; color: var(--muted);
    background: var(--surface2);
    padding: 6px 14px; border-radius: 99px;
    border: 1px solid var(--border);
  }
  .status-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--muted);
    transition: background 0.3s;
  }
  .status-dot.live { background: var(--danger); animation: blink 1s infinite; }
  .status-dot.ready { background: var(--accent); }

  .transcript-area {
    width: 100%;
    min-height: 120px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 18px;
    font-family: var(--font-mono); font-size: 0.92rem;
    color: var(--text); line-height: 1.7;
    resize: vertical; outline: none;
    transition: border-color 0.18s;
  }
  .transcript-area:focus { border-color: var(--accent); }
  .transcript-area::placeholder { color: var(--muted); }

  .card-actions {
    display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
    width: 100%;
  }

  /* ── HISTORY PAGE ── */
  .history-page {
    min-height: 100vh;
    display: flex; flex-direction: column;
  }
  .history-content {
    flex: 1;
    max-width: 720px; width: 100%;
    margin: 0 auto; padding: 40px 20px;
  }
  .history-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 30px; flex-wrap: wrap; gap: 12px;
  }
  .history-header h2 {
    font-family: var(--font-head); font-size: 2rem; font-weight: 800;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .history-empty {
    display: flex; flex-direction: column; align-items: center;
    gap: 16px; padding: 80px 0;
    color: var(--muted); text-align: center;
  }
  .history-empty .empty-icon { font-size: 3rem; opacity: 0.4; }
  .history-list { display: flex; flex-direction: column; gap: 14px; }
  .history-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px 22px;
    display: flex; flex-direction: column; gap: 10px;
    transition: border-color 0.2s, transform 0.2s;
    animation: slideUp 0.3s ease both;
  }
  .history-card:hover { border-color: rgba(0,229,255,0.25); transform: translateY(-2px); }
  .history-card-text {
    font-size: 0.95rem; line-height: 1.65; color: var(--text);
  }
  .history-card-footer {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;
  }
  .history-date {
    font-size: 0.75rem; color: var(--muted);
    display: flex; align-items: center; gap: 5px;
  }

  /* ── TOAST ── */
  .toast-container {
    position: fixed; bottom: 24px; right: 24px;
    display: flex; flex-direction: column; gap: 8px;
    z-index: 9999;
  }
  .toast {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 18px;
    font-size: 0.85rem;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: slideUp 0.25s ease;
    max-width: 320px;
  }
  .toast.success { border-color: rgba(0,229,255,0.35); }
  .toast.error   { border-color: rgba(255,77,109,0.35); }

  /* ── ANIMATIONS ── */
  @keyframes spin      { to { transform: rotate(360deg); } }
  @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes slideUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(0,229,255,0.4); }
    70%  { box-shadow: 0 0 0 18px rgba(0,229,255,0); }
    100% { box-shadow: 0 0 0 0 rgba(0,229,255,0); }
  }
  @keyframes wave {
    0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(1)}
  }

  /* ── SOUND WAVE (decorative) ── */
  .wave-bars {
    display: flex; align-items: center; gap: 3px; height: 28px;
  }
  .wave-bars span {
    display: block; width: 3px; border-radius: 99px;
    background: var(--accent);
  }
  .wave-bars.active span:nth-child(1){animation:wave 0.9s ease-in-out 0.0s infinite;}
  .wave-bars.active span:nth-child(2){animation:wave 0.9s ease-in-out 0.1s infinite;}
  .wave-bars.active span:nth-child(3){animation:wave 0.9s ease-in-out 0.2s infinite;}
  .wave-bars.active span:nth-child(4){animation:wave 0.9s ease-in-out 0.3s infinite;}
  .wave-bars.active span:nth-child(5){animation:wave 0.9s ease-in-out 0.4s infinite;}
  .wave-bars span { height: 10px; }
  .wave-bars.active span:nth-child(odd){ height: 22px; }
  .wave-bars.active span:nth-child(even){ height: 14px; }

  /* ── RESPONSIVE ── */
  @media (max-width: 480px) {
    .nova-nav { padding: 0 16px; }
    .nova-brand { font-size: 1.1rem; }
    .btn { padding: 7px 12px; font-size: 0.75rem; }
    .mic-card { padding: 28px 20px; }
    .auth-box { margin: 16px; padding: 28px 20px; }
    .history-content { padding: 24px 14px; }
  }
`;

/* ─────────────────────────────────────────
   TOAST SYSTEM
───────────────────────────────────────── */
const ToastContext = React.createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);
  return (
    <ToastContext.Provider value={add}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span>{t.type === "success" ? "✓" : "✕"}</span>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
const useToast = () => React.useContext(ToastContext);

/* ─────────────────────────────────────────
   AUTH MODAL
───────────────────────────────────────── */
function AuthModal({ type, onClose, onSwitchType, onAuthSuccess }) {
  const toast = useToast();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === "login") {
        const res = await API.post("/login", { email: data.email, password: data.password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.name);
        toast("Login successful!", "success");
        onAuthSuccess(res.data.user.name);
        onClose();
      } else {
        await API.post("/register", data);
        toast("Registered successfully! Please login.", "success");
        onSwitchType("login");
      }
      setData({ name: "", email: "", password: "" });
    } catch (err) {
      const message = err.response?.data?.message;
      if (type === "register" && message === "User already exists") {
        toast("User already exists. Please login.", "error");
        onSwitchType("login");
      } else {
        toast(message || "Something went wrong", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay-modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="auth-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{type === "login" ? "Welcome back" : "Create account"}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {type === "register" && (
            <input className="auth-input" type="text" placeholder="Your name"
              value={data.name} onChange={e => setData({ ...data, name: e.target.value })} required />
          )}
          <input className="auth-input" type="email" placeholder="Email address"
            value={data.email} onChange={e => setData({ ...data, email: e.target.value })} required />
          <input className="auth-input" type="password" placeholder="Password"
            value={data.password} onChange={e => setData({ ...data, password: e.target.value })} required />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <><div className="spinner" /> Processing…</> : (type === "login" ? "Login" : "Register")}
          </button>
        </form>
        <p className="switch-text" style={{ marginTop: 16 }}>
          {type === "login"
            ? <>Don't have an account? <span onClick={() => onSwitchType("register")}>Register</span></>
            : <>Already have an account? <span onClick={() => onSwitchType("login")}>Login</span></>
          }
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NOVABAR
───────────────────────────────────────── */
function Novabar({ username, setUsername }) {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
  };

  return (
    <>
      <nav className="nova-nav">
        <div className="nova-brand">nova<span>.voice</span></div>
        <div className="nav-actions">
          {!username ? (
            <>
              <button className="btn btn-ghost" onClick={() => setModalType("login")}>Login</button>
              <button className="btn btn-primary" onClick={() => setModalType("register")}>Register</button>
            </>
          ) : (
            <>
              <button className="btn btn-user">
                <span>👤</span> {username}
              </button>
              <button className="btn btn-ghost" onClick={() => navigate("/history")}>
                📋 History
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      {modalType && (
        <AuthModal
          type={modalType}
          onClose={() => setModalType(null)}
          onSwitchType={setModalType}
          onAuthSuccess={(name) => setUsername(name)}
        />
      )}
    </>
  );
}

/* ─────────────────────────────────────────
   HISTORY PAGE
───────────────────────────────────────── */
function HistoryPage({ username, setUsername }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await gethistory();
        setHistory(res.data);
      } catch {
        toast("Failed to load history", "error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deletehistory(id);
      setHistory(prev => prev.filter(i => i._id !== id));
      toast("Entry deleted", "success");
    } catch {
      toast("Error deleting entry", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="history-page">
      <Novabar username={username} setUsername={setUsername} />
      <div className="history-content">
        <div className="history-header">
          <h2>Your History</h2>
          <button className="btn btn-ghost" onClick={() => navigate("/")}>← Back</button>
        </div>

        {loading ? (
          <div className="spinner-center"><div className="spinner spinner-lg" /></div>
        ) : history.length === 0 ? (
          <div className="history-empty">
            <div className="empty-icon">🎙️</div>
            <p>No transcriptions yet.</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>Start recording</button>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item, i) => (
              <div className="history-card" key={item._id} style={{ animationDelay: `${i * 0.06}s` }}>
                <p className="history-card-text">{item.text}</p>
                <div className="history-card-footer">
                  <span className="history-date">
                    🕐 {new Date(item.date).toLocaleString()}
                  </span>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                  >
                    {deletingId === item._id ? <><div className="spinner" /> Deleting</> : "🗑 Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SPEECH TO TEXT MAIN PAGE
───────────────────────────────────────── */
function SpeechPage({ username, setUsername }) {
  const toast = useToast();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [saving, setSaving] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setSupported(false); return; }
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onresult = (e) => {
      let full = "";
      for (let i = 0; i < e.results.length; i++) {
        full += e.results[i][0].transcript;
      }
      setTranscript(full);
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const handleSave = async () => {
    if (!transcript.trim()) { toast("Nothing to save", "error"); return; }
    if (!username) { toast("Please login to save", "error"); return; }
    setSaving(true);
    try {
      await savehistory({ text: transcript });
      toast("Saved to history!", "success");
      setTranscript("");
    } catch {
      toast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = () => {
    if (!transcript.trim()) return;
    navigator.clipboard.writeText(transcript);
    toast("Copied to clipboard!", "success");
  };

  const handleClear = () => {
    if (listening) { recognitionRef.current?.stop(); setListening(false); }
    setTranscript("");
  };

  return (
    <div className="app-shell">
      <Novabar username={username} setUsername={setUsername} />
      <div className="main-content">
        <div style={{ textAlign: "center" }}>
          <h1 className="hero-title">
            Speak, we'll <span className="gradient">listen</span>
          </h1>
        </div>
        <p className="hero-sub">
          Convert speech to text instantly. Save to history, copy anywhere.
        </p>

        <div className="mic-card">
          {/* Wave bars */}
          <div className={`wave-bars ${listening ? "active" : ""}`}>
            <span/><span/><span/><span/><span/>
          </div>

          {/* Mic button */}
          <div className={`mic-ring ${listening ? "listening" : ""}`}>
            <button
              className={`mic-btn ${listening ? "active" : ""}`}
              onClick={toggleListening}
              disabled={!supported}
              title={listening ? "Stop recording" : "Start recording"}
            >
              {listening ? "⏹" : "🎙"}
            </button>
          </div>

          {/* Status */}
          <div className="status-badge">
            <span className={`status-dot ${listening ? "live" : transcript ? "ready" : ""}`} />
            {!supported ? "Not supported in this browser"
              : listening ? "Recording…"
              : transcript ? "Ready"
              : "Tap mic to start"}
          </div>

          {/* Transcript */}
          <textarea
            className="transcript-area"
            placeholder="Your transcription will appear here…"
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            rows={5}
          />

          {/* Actions */}
          <div className="card-actions">
            <button className="btn btn-ghost" onClick={handleCopy} disabled={!transcript.trim()}>
              📋 Copy
            </button>
            <button className="btn btn-ghost" onClick={handleClear} disabled={!transcript && !listening}>
              🗑 Clear
            </button>
            <button className="btn btn-primary" onClick={handleSave} disabled={!transcript.trim() || saving}>
              {saving ? <><div className="spinner" /> Saving…</> : "💾 Save"}
            </button>
          </div>
        </div>

        {!username && (
          <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
            Login to save transcriptions to your history.
          </p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ROOT APP
───────────────────────────────────────── */
function AppInner() {
  const [username, setUsername] = useState(() => localStorage.getItem("username") || null);

  return (
    <>
      <style>{STYLES}</style>
      <Routes>
        <Route path="/" element={<SpeechPage username={username} setUsername={setUsername} />} />
        <Route path="/history" element={<HistoryPage username={username} setUsername={setUsername} />} />
      </Routes>
    </>
  );
}

export default function SpeechApp() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppInner />
      </ToastProvider>
    </BrowserRouter>
  );
}
