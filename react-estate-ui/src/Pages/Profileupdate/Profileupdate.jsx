import React, { useContext, useState } from "react";
import "./Profileupdate.scss";
import { Authcontext } from "../../Authcontext";
import { userata } from "../../Lib/Dummydata";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cloudy from "../../Components/Cloudy/Cloudy";
import { apiRequest } from "../../Lib/Apirequest";

export default function Profileupdate() {
  const { currentuser, updateuser } = useContext(Authcontext);
  const [avatar, setAvatar] = useState(currentuser.message.avatar || '');
  const [err, seterr] = useState();
  const navigate = useNavigate(); // Moved to top level of the component

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(
        `user/${currentuser.message.id}`,
        {
          email,
          password,
          username,
          avatar, // Include the avatar URL
        },
      
      );

      await updateuser(res.data); // localStorage.setItem("user", JSON.stringify(res.data))
      navigate("/profile");

    } catch (error) {
      console.log(error);
      seterr(error.response.data.message);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handlesubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentuser.message.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentuser.message.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {err && <p className="error">{err}</p>}
        </form>
      </div>
      <div className="sideContainer">
        <Cloudy setAvatar={setAvatar} />
        <img
          src={avatar || userata.img}
          alt=""
          className="avatar"
        />
      </div>
    </div>
  );
}
