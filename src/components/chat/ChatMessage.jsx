import { useContext , useEffect, useRef } from "react";
import { AccountContext } from "../../Context";

function ChatMessage({ value }) {
  const { account, person } = useContext(AccountContext);

  const formatDate = (value) => {
    let hours = new Date(value).getHours();
    let min = new Date(value).getMinutes();
    return `${hours < 10 ? "0" + hours : hours} : ${
      min < 10 ? "0" + min : min
    }`;
  };
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ transition: "smooth" });
  }, [value]);

  return (
    <>
      {value.senderId === account.sub ? (
        <div className="chatbox-message senderMessage " ref={scroll}>
          <p className="text-messager">{value.text}</p>
          <p className="message-time">{formatDate(value.updatedAt)}</p>
        </div>
      ) : (
        <div className="chatbox-message reciverMessage" ref={scroll}>
          <p className="text-message ">{value.text}</p>
          <p className="message-time">{formatDate(value.updatedAt)}</p>
        </div>
      )}
    </>
  );
}

export default ChatMessage;
