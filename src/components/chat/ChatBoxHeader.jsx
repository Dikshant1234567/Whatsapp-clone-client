import React, { useContext, useState } from "react";
import { AccountContext } from "../../Context";

function ChatBoxHeader({ setOpenProfile }) {
  const { account } = useContext(AccountContext);
  // console.log(account.picture);



  return (
    <div className="chatboxHeader">
      <img
        src={account.picture}
        alt="dp"
        onClick={() => setOpenProfile(true)}
      />

      <h1>Your Chat</h1>
    </div>
  );
}

export default ChatBoxHeader;
