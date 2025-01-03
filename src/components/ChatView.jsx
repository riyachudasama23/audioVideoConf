import { usePubSub } from "@videosdk.live/react-sdk";
import { useState } from "react";

function ChatView() {
    // destructure publish method from usePubSub hook
    const { publish, messages } = usePubSub("CHAT");
  
    // State to store the user typed message
    const [message, setMessage] = useState("");
  
    const handleSendMessage = () => {
      // Sending the Message using the publish method
      publish(message, { persist: true });
      // Clearing the message input
      setMessage("");
    };
  
    return (
      <>
        <div>
            <p>Messages: </p>
            {messages.map((msg, index) => {
                return (
                <p key={index}>
                    {msg.senderName} says: {msg.message}
                </p>
                );
            })}
        </div>
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </>
    );
}

export default ChatView;