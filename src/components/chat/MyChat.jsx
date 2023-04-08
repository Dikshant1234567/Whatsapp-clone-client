import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AccountContext } from "../../Context";

function MyChat({ text }) {
  const { account, setPerson, socket, setActiveUser , ApiUrl } =
    useContext(AccountContext);

  const [Myuser, setMyuser] = useState([]);

  const getUser = async () => {
    try {
      let result = await axios.get(`${ApiUrl}/getuser`);
      setMyuser(result.data);
    } catch (error) {
      console.log("This is an error while calling Getuser", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const ShowUser = async (userInfo) => {
    setPerson(userInfo);

    try {
      let response = await axios.post(
        `${ApiUrl}/conversation/add`,
        {
          senderId: account.sub,
          reciverId: userInfo.sub,
        }
      );
    } catch (error) {
      console.log(
        "error while building the communication between the sender and user :",
        error
      );
    }
  };

  useEffect(() => {
    socket.current.emit("addUsers", account);
    socket.current.on("getUsers", (User) => {
      setActiveUser(User);
    });
  }, [account]);

  return (
    <div className="mychat">
      {Myuser.map(
        (value) =>
          value.sub !== account.sub && (
            <>
              <div className="person" onClick={() => ShowUser(value)}>
                <img src={value.picture} alt="dp" />
                <h3>{value.name}</h3>
              </div>
              <hr style={{ color: "black", height: "5px", opacity: ".5" }} />
            </>
          )
      )}
    </div>
  );
}

export default MyChat;
