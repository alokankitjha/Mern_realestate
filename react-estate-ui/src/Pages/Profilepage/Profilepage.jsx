import React, { useRef, useEffect, useContext } from "react";
import "./Profilepage.scss";
import { userata } from "../../Lib/Dummydata";
import List from "../../Components/List/List";
import Chat from "../../Components/Chat/Chat";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { Authcontext } from "../../Authcontext";
import { apiRequest } from "../../Lib/Apirequest";

export default function Profilepage() {
  const post = useLoaderData();
  const postdata = post.mypost;
  const savedata = post.savepost;
  console.log(post.mypost);
  console.log(post.savepost);

  const { currentuser, updateuser } = useContext(Authcontext);
  const navigate = useNavigate();
  const chatBoxRef = useRef(null);
  console.log(currentuser);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  const handleLogout = async () => {
    try {
      console.log("Attempting to log out...");
      await apiRequest.post("logout");
      updateuser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

 



  return (
    <div className="profilepage">
      <div className="deails">
        <div className="wrapperr">
          <div className="titlee">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update profile</button>
            </Link>
            <button onClick={scrollToBottom} className="blueb">message</button>
          </div>
          <div className="myinfo">
            <span className="avatar">
              Avatar <img src={currentuser.message.avatar || userata.img} alt="User Avatar" />
            </span>
            <span className="username">
              username :<b>{currentuser.message.username}</b>
            </span>
            <span className="email">
              email :<b>{currentuser.message.email}</b>
            </span>
            <button className="logout"><Link to="/add">Add Hotel</Link></button>
            <button onClick={handleLogout} className="logout">log out</button>
          </div>
          <div className="titlee">
            <h1>My list</h1>
            <button>Create list</button>
          </div>
          <List dataa={postdata} />
          <div className="titlee">
            <h1>Saved list</h1>
          </div>
          <List dataa={savedata} />
        </div>
      </div>
      <div className="chatbox">
        <div className="wrapperr" ref={chatBoxRef}>
          <Chat />
        </div>
      </div>
    </div>
  );
}
