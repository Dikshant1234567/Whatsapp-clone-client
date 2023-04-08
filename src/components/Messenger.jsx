import Chat from "./chat/Chat";
import Login from "./Login";
import { AccountContext } from "../Context";
import { useContext, useEffect } from "react";

function Messenger() {
  const { account } = useContext(AccountContext);

  useEffect(() => {
    console.log(account);
  }, []);

  return <>{account ? <Chat /> : <Login />}</>;
}

export default Messenger;
