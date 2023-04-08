import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [person, setPerson] = useState({});
  const [ActiveUser, setActiveUser] = useState([]);

  const socket = useRef();
  // const ApiUrl= "http://localhost:8888"
  const ApiUrl= "https://whatsapp-clone-backend-jo9q.onrender.com"



  useEffect(() => {
    // socket.current = io("ws://localhost:9000");
    socket.current = io("https://whatsapp-clonesocket.adaptable.app");
  }, []);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        person,
        setPerson,
        socket,
        ActiveUser,
        setActiveUser,
        ApiUrl
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
