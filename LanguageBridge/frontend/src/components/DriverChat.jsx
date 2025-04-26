import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io('http://localhost:5000'); // Backend server address

function DriverChat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Driver joins with his unique ID
    socket.emit('join', 'driver1');

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Driver Chat</h2>
      <div className="border w-full h-80 overflow-y-scroll p-2 mb-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 my-1 text-left">
            <p><strong>Customer (Translated):</strong> {msg.translatedText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriverChat;
