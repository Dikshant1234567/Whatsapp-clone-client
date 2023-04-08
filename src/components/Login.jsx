import React, { useContext } from "react";
import { Qrcode } from "./asserts/allfile";
import { GoogleLogin } from "@react-oauth/google";
import Jwt_decode from "jwt-decode";
import { AccountContext } from "../Context";
import axios from "axios";

function Login() {
  const { setAccount , ApiUrl } = useContext(AccountContext);

  const AddUser = async (data) => {
    try {
      axios.post(`${ApiUrl}/add`, data);
    } catch (err) {
      console.log(err);
    }
  };

  const SuccessHandler = async (resp) => {
    const decode = Jwt_decode(resp.credential);
    // console.log(decode);
    setAccount(decode);
    await AddUser(decode);
  };

  const ErrorHandler = (resp) => {
    console.log(resp);
  };
  return (
    <section className="intro-page">
      <div className="header"></div>
      <div className="introPage-main">
        <div className="introPage-info">
          <h2>Use Whatsapp on your computer:</h2>
          <ol>
            <li>Open Whatsapp on your phone</li>
            <li>Link Your Device</li>
            <li>Tap on Link Device</li>
            <li>Point Your phone to the screen to capture the code</li>
          </ol>
        </div>
        <div className="qrDiv">
          <img className="qrimg" src={Qrcode} alt="Qr scanner" />
          <span className="loginBox">
            <GoogleLogin onSuccess={SuccessHandler} onError={ErrorHandler} />
          </span>
        </div>
      </div>
    </section>
  );
}

export default Login;
