import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Token from "./Token";

function Chatbot() {
  var tokenCtx = useContext(Token);
  var [currentToken, setCurrentToken] = useState(tokenCtx);

  function deleteToken() {
    localStorage.removeItem("token");
    setCurrentToken(null);
  }

  var [messages, setMessages] = useState([]);
  var [input, setInput] = useState("");
  var [loading, setLoading] = useState(false);
  var bottomRef = useRef(null);
  var textareaRef = useRef(null);

  var suggestions = ["Explain black holes", "Write a poem", "Debug my code", "Summarize a topic"];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function getTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  async function sendMessage(text) {
    var prompt = text || input.trim();
    if (!prompt || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: prompt, time: getTime() }]);
    setLoading(true);
    try {
      var res = await fetch("https://chatapi-nine-pink.vercel.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      var data = await res.json();
      setMessages(prev => [...prev, { role: "bot", text: data.response || data.error, time: getTime() }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "Something went wrong. Please try again.", time: getTime() }]);
    }
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <div style={styles.avatar}>✦</div>
        <div>
          <p style={styles.title}>Barrun's Assistant</p>
          <p style={styles.status}><span style={styles.dot} /> Online</p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {currentToken !== null ? (
            <button style={{ ...styles.badge, border: "none", cursor: "pointer" }} onClick={deleteToken}>Logout</button>
          ) : (
            <>
              <Link to="/login" style={{ ...styles.badge, textDecoration: "none" }}>Login</Link>
              <Link to="/register" style={{ ...styles.badge, textDecoration: "none" }}>Register</Link>
            </>
          )}
        </div>
      </div>

      <div style={styles.messages}>
        {messages.length === 0 && (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>✦</div>
            <p style={{ color: "#6b6b8a", fontSize: 14 }}>What can I help you with?</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ ...styles.row, flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
            <div style={{ ...styles.msgAv, background: m.role === "bot" ? "linear-gradient(135deg,#7c6af7,#c084fc)" : "#1c1c26" }}>
              {m.role === "bot" ? "✦" : "👤"}
            </div>
            <div>
              <div style={{ ...styles.bubble, background: m.role === "user" ? "linear-gradient(135deg,#1e1b4b,#2d2466)" : "#13131a", border: m.role === "user" ? "1px solid rgba(124,106,247,0.3)" : "1px solid #2a2a3a", borderBottomRightRadius: m.role === "user" ? 4 : 16, borderBottomLeftRadius: m.role === "bot" ? 4 : 16 }}>
                {m.text}
              </div>
              <p style={{ ...styles.time, textAlign: m.role === "user" ? "right" : "left" }}>{m.time}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div style={styles.row}>
            <div style={{ ...styles.msgAv, background: "linear-gradient(135deg,#7c6af7,#c084fc)" }}>✦</div>
            <div style={{ ...styles.bubble, background: "#13131a", border: "1px solid #2a2a3a" }}>
              <div style={styles.dots}>
                {[0, 1, 2].map(i => <span key={i} style={{ ...styles.dot2, animationDelay: `${i * 0.2}s` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length === 0 && (
        <div style={styles.suggestions}>
          {suggestions.map(s => (
            <button key={s} style={styles.chip} onClick={() => sendMessage(s)}>{s}</button>
          ))}
        </div>
      )}

      <div style={styles.inputArea}>
        <textarea ref={textareaRef} style={styles.input} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} placeholder="Ask anything..." rows={1} />
        <button style={{ ...styles.sendBtn, opacity: loading ? 0.5 : 1 }} onClick={() => sendMessage()} disabled={loading}>
          ➤
        </button>
      </div>
    </div>
  );
}

var styles = {
  app: { fontFamily: "DM Sans, sans-serif", background: "#0a0a0f", borderRadius: 20, border: "1px solid #2a2a3a", display: "flex", flexDirection: "column", height: 580, overflow: "hidden" },
  header: { padding: "16px 20px", borderBottom: "1px solid #2a2a3a", background: "#13131a", display: "flex", alignItems: "center", gap: 12 },
  avatar: { width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg,#7c6af7,#c084fc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  title: { fontWeight: 600, fontSize: 15, color: "#f0f0f8", margin: 0 },
  status: { display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6b6b8a", margin: 0 },
  dot: { width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "inline-block" },
  badge: { fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "rgba(124,106,247,0.12)", color: "#a78bfa", border: "1px solid rgba(124,106,247,0.25)" },
  messages: { flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14 },
  empty: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 },
  emptyIcon: { width: 52, height: 52, borderRadius: 16, background: "rgba(124,106,247,0.1)", border: "1px solid rgba(124,106,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 },
  row: { display: "flex", alignItems: "flex-end", gap: 8 },
  msgAv: { width: 28, height: 28, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 },
  bubble: { maxWidth: 400, padding: "11px 15px", borderRadius: 16, fontSize: 14, lineHeight: 1.6, color: "#f0f0f8" },
  time: { fontSize: 10, color: "#6b6b8a", margin: "4px 4px 0" },
  dots: { display: "flex", gap: 4 },
  dot2: { width: 6, height: 6, borderRadius: "50%", background: "#7c6af7", display: "inline-block", animation: "bounce 1.2s infinite ease-in-out" },
  suggestions: { display: "flex", flexWrap: "wrap", gap: 6, padding: "0 16px 12px" },
  chip: { fontSize: 12, padding: "6px 12px", borderRadius: 20, background: "#1c1c26", border: "1px solid #2a2a3a", color: "#6b6b8a", cursor: "pointer" },
  inputArea: { padding: "12px 16px", borderTop: "1px solid #2a2a3a", background: "#13131a", display: "flex", alignItems: "flex-end", gap: 10 },
  input: { flex: 1, background: "#1c1c26", border: "1px solid #2a2a3a", borderRadius: 14, padding: "10px 14px", fontSize: 14, color: "#f0f0f8", resize: "none", outline: "none", fontFamily: "inherit" },
  sendBtn: { width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#7c6af7,#a78bfa)", border: "none", cursor: "pointer", color: "#fff", fontSize: 16, flexShrink: 0 },
};

export default Chatbot;