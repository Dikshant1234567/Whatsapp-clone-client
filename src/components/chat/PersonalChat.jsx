import axios from "axios";
import React, { useContext, useState, useEffect, useRef } from "react";
import { AccountContext } from "../../Context";
import ChatMessage from "./ChatMessage";

function PersonalChat() {
  const { person, account, ActiveUser, socket , ApiUrl } = useContext(AccountContext);
  const [mymessage, setMymessage] = useState("");
  const [conversation, setConversation] = useState({});
  const [Id, setId] = useState("");
  const [oldMessages, setOldMessages] = useState([]);
  const [incommingMessage, setIncommingMessage] = useState(null);



  // message save api
  const newMessage = async (Message) => {
    try {
      const data = await axios.post(
        `${ApiUrl}/message/add`,
        Message
      );
      // console.log(data);
    } catch (error) {
      console.log("error while callin newMessage ", error);
    }
  };

  // enter button functionally
  const sendMessage = (e) => {
    const key = e.keycode || e.which;
    if (key === 13) {
      let message = {
        senderId: account.sub,
        reciverId: person.sub,
        conversationId: conversation.data._id,
        type: "text",
        text: mymessage,
      };
      // socket message
      socket.current.emit("sendMessage", message);

      newMessage(message);
      setMymessage("");
    }
  };
  useEffect(() => {
    // socket.current.on("getMessage", (data) => {
    socket.current.on("getMessage", (data) => {
      console.log(data);
      setIncommingMessage({
        ...data,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    });
  }, []);

  const getConversationDetails = async () => {
    try {
      let response = await axios.post(
        `${ApiUrl}/conversation/get`,
        {
          senderId: account.sub,
          reciverId: person.sub,
        }
      );
      setConversation(response);
      setId(response.data._id);
    } catch (error) {
      console.log("Error occured while calling getConversationDetails ", error);
    }
  };

  // get message api call
  const getMyMessage = async (id) => {
    try {
      const response = await axios.get(
        `${ApiUrl}/message/get/${id}`
      );
      // console.log(response);
      setOldMessages(response.data);
    } catch (error) {
      console.log(`while calling getMessages  check  ${id}check`, error);
    }
  };

  // useeffect
  useEffect(() => {
    getConversationDetails();
  }, [person.sub]);

  useEffect(() => {
    if (Id && getConversationDetails()) {
      // console.log("calling get message");
      getMyMessage(Id);
    } else {
      console.log("wait for the Id", Id);
    }
  }, [person._id, Id]);

  useEffect(() => {
    incommingMessage && setOldMessages((prv) => [...prv, incommingMessage]);
  }, [incommingMessage, conversation]);
  // console.log(incommingMessage);

  return (
    <section className="personal-chat">
      <div className="personalChat-header">
        <img src={person.picture} alt="dp" />
        <div className="personal-info">
          <h2>{person.name}</h2>
          <p>
            {ActiveUser.find((user) => user.sub === person.sub)
              ? "online"
              : "offline"}
          </p>
        </div>
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
          <i className="fa-solid fa-video"></i>
          <i className="fa-solid fa-phone"></i>
        </span>
      </div>

      <div className="personal-Chat-box">
        {oldMessages.map((value , index) => {
          return (
            <ChatMessage
              value={value}
              setOldMessages={setOldMessages}
              Id={Id}
              key={index}
            />
          );
        })}
      </div>

      <div className="personal-box-footer">
        <i className="fa-regular fa-face-smile"></i>
        <i className="fa-solid fa-paperclip"></i>
        <input
          type="text"
          placeholder="Enter the text..."
          value={mymessage}
          onChange={(e) => setMymessage(e.target.value)}
          onKeyPress={(e) => sendMessage(e)}
        />
        <i className="fa-solid fa-microphone"></i>
      </div>
    </section>
  );
}

export default PersonalChat;
