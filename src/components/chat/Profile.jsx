import React, { useContext } from "react";
import { AccountContext } from "../../Context";

function Profile({ setOpenProfile }) {
  const { account } = useContext(AccountContext);

  return (
    <section className="profile-page">
      <h1>Profile</h1>

      <i
        className="fa-solid fa-arrow-left back-arrow"
        onClick={() => setOpenProfile(false)}
      ></i>

      <div className="profileImage">
        <img src={account.picture} alt="dp" />
      </div>
      <div className="profileName">
        <h3>Your Name</h3>
        <h4>{account.given_name}</h4>
        <p>
          This is not Your username or pin. This name will be visible to your
          Whatsapp contacts.
        </p>
      </div>
      <div className="profileAbout">
        <h3>About</h3>
        <h4>BE CALM!</h4>
      </div>
      <h1 className="profileHelp">Help?</h1>
    </section>
  );
}

export default Profile;
