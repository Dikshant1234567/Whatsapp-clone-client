import React, { useState } from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import MyChat from "./MyChat";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

function ChatBox() {
  const [openProfile, setOpenProfile] = useState(false);
  const[text,setText]= useState()

  return (
    <section className="chat-left">
      {openProfile ? (
        <Profile setOpenProfile={setOpenProfile} />
      ) : (
        <>
          <ChatBoxHeader setOpenProfile={setOpenProfile} />
          <SearchBar text={text} setText={setText} />
          <MyChat text={text} />
        </>
      )}
    </section>
  );
}

export default ChatBox;
