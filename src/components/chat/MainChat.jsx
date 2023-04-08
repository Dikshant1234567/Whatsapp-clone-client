import React, { useContext } from "react";
import ChatBox from "./ChatBox";
import EmptyChatBox from "./EmptyChatBox";
import PersonalChat from "./PersonalChat";
import { AccountContext } from "../../Context";

function MainChat() {
  const { person } = useContext(AccountContext);
  // console.log(person);
  return (
    <section className="chat-box">
      <ChatBox />
      {Object.keys(person).length ? <PersonalChat /> : <EmptyChatBox />}
    </section>
  );
}

export default MainChat;
