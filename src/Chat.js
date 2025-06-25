import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "messages"), {
      text: input,
      createdAt: serverTimestamp()
    });
    setInput("");
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ccc" }}>
        {messages.map(msg => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={e => setInput(e.target.value)} required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
