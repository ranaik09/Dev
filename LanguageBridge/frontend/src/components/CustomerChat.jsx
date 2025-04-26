import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io('http://localhost:5000'); // Backend server address

function CustomerChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [driverId, setDriverId] = useState('');

  useEffect(() => {
    // Join the room with customer ID (Here you can set static or dynamic later)
    socket.emit('join', 'customer1');

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, { ...data, fromMe: false }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (!driverId || !message) return;

    try {
      const res = await axios.post('https://libretranslate.de/translate', {
        q: message,
        source: "en",
        target: "hi", // For example, Hindi
        format: "text"
      }, {
        headers: { accept: "application/json" }
      });

      const translatedText = res.data.translatedText;

      socket.emit('send_message', {
        senderId: 'customer1',
        receiverId: driverId,
        originalText: message,
        translatedText: translatedText
      });

      setMessages((prev) => [...prev, { originalText: message, translatedText, fromMe: true }]);
      setMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Customer Chat</h2>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Enter Driver ID..."
        value={driverId}
        onChange={(e) => setDriverId(e.target.value)}
      />
      <div className="border w-full h-80 overflow-y-scroll p-2 mb-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 ${msg.fromMe ? 'text-right' : 'text-left'}`}>
            <p><strong>Original:</strong> {msg.originalText}</p>
            <p><strong>Translated:</strong> {msg.translatedText}</p>
          </div>
        ))}
      </div>
      <textarea
        className="border p-2 mb-2 w-full"
        rows="2"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default CustomerChat;
