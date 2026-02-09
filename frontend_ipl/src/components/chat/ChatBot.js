import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { from: "user", text: input }]);

    try {
      const res = await axios.post("http://localhost:8080/api/chat", {
        message: input,
      });

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Server error 😕" },
      ]);
    }

    setInput("");
  };

  return (
    <div style={styles.box}>
      <h4>🏏 IPL AI Chat</h4>

      <div style={styles.chat}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              background: m.from === "user" ? "#2563eb" : "#e5e7eb",
              color: m.from === "user" ? "#fff" : "#000",
              alignSelf: m.from === "user" ? "flex-end" : "flex-start",
            }}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask IPL question..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.btn}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  box: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    padding: "10px",
    zIndex: 9999,
  },
  chat: {
    height: "220px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  msg: {
    padding: "6px 10px",
    borderRadius: "8px",
    maxWidth: "80%",
    fontSize: "14px",
  },
  inputRow: {
    display: "flex",
    marginTop: "8px",
    gap: "5px",
  },
  input: {
    flex: 1,
    padding: "6px",
  },
  btn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },
};

export default ChatBot;
