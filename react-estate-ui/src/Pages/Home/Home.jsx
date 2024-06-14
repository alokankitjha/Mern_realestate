import React, { useContext } from "react";
import "./Home.scss";
import bg from "../../../public/bg.png";
import Searchbar from "../../Components/Searchbar";
import { Authcontext } from "../../Authcontext";


export default function Home() {
  const {currentuser}=useContext(Authcontext)
  console.log(currentuser)
  return (
    <div className="home">
      <div className="textcontainer">
        <div className="wrapper">
          {" "}
          <h1 className="title">
            Find Real estate and get your dream place 
          </h1>
          <p className="para">
          It addresses such as communication and synchronization between multiple sub-tasks
and processes which is difficult to achieve
          </p>
          <Searchbar></Searchbar>
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>years of experience</h2>
            </div>
            <div className="box">
              <h1>200+</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>12000+</h1>
              <h2>property ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgcontainer">
        {" "}
        <img src={bg} />
      </div>
    </div>
  );
}
