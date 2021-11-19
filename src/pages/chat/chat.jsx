import { useEffect, useState } from "react";
import { addChatMessageToTumpang, doSomething } from "../../firebase";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
} from "unique-names-generator";
import "./chat.css";

const Chat = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tumpangId = urlParams.get("id");
  const [messages, setMessages] = useState([]);

  let name = localStorage.getItem("name");
  if (!name) {
    const shortName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
      length: 2,
    });

    name = shortName;
    localStorage.setItem("name", name);
  }

  // new message
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    await addChatMessageToTumpang(tumpangId, { message, name });
    setMessage("");
  };

  useEffect(() => {
    doSomething(tumpangId, (messages) => {
      const sortedMessages = messages
        .filter((m) => !!m.createdAt)
        .sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

      setMessages(sortedMessages);
    });
  }, []);

  return (
    <section className="chat-section">
      <div className="chat-box">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${message.name === name && "chat-message--mine"}`}
          >
            <span className="chat-message">
              {message.name === name ? "" : message.name + ":"}{" "}
              {message.message}
            </span>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="chat__new-message">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>
            <span className="material-icons-outlined">send</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Chat;
