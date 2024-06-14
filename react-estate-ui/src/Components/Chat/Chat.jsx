import React, { useState } from 'react'
import "./Chat.scss"
import {userata} from "../../Lib/Dummydata"

export default function Chat() {
    const [chat, setChat] = useState(false)
  return (
    <div className="chat">
      {chat ? "":(  <div className="top">
            <h1>messages</h1>
            <div className="message" onClick={()=>(setChat(!chat))}>
            <img src={userata.img}/>
                <span>john doe</span>
                <p>imp mesage...... urgrnt room nreeder</p>
            </div>
            <div className="message">
            <img src={userata.img}/>
                <span>john doe</span>
                <p>imp mesage...... urgrnt room nreeder</p>
            </div>
            <div className="message">
            <img src={userata.img}/>
                <span>john doe</span>
                <p>imp mesage...... urgrnt room nreeder</p>
            </div>
            <div className="message">
            <img src={userata.img}/>
                <span>john doe</span>
                <p>imp mesage...... urgrnt room nreeder</p>
            </div>
            <div className="message">
            <img src={userata.img}/>
                <span>john doe</span>
                <p>imp mesage...... urgrnt room nreeder</p>
            </div>
            <div className="message">
            <img src={userata.img}/>
                <span>john doe</span>
                <p>imp mesage...... urgrnt room nreeder</p>
            </div>
            <div className="message">
            <img src={userata.img}/>
                <span>john doe</span>
                <p>imp mesage...... urgrnt room nreeder</p>
            </div>
            <div className="message">
            <img src={userata.img}/>
                <span>john doe</span>
                <p>imp mesage...... urgrnt room nreeder</p>
            </div>
        </div>)}
      {chat&&  <div className="bottom">
            <div className="upper">
            <div className="user">
              <img
                src={userata.img}
                alt=""
              />
              John Doe
            </div>
            <span onClick={()=>(setChat(!chat))}>x</span>
            </div>
            <div className="center">
                <div className="chatmessage">
                    <p>message is this</p>
                    <span>one hour ago</span>
                </div>
                <div className="chatmessage own">
                    <p>message is this</p>
                    <span>one hour ago</span>
                </div>
                <div className="chatmessage">
                    <p>message is this</p>
                    <span>one hour ago</span>
                </div>
                <div className="chatmessage own">
                    <p>message is this</p>
                    <span>one hour ago</span>
                </div>
                <div className="chatmessage own">
                    <p>message is this</p>
                    <span>one hour ago</span>
                </div>
                <div className="chatmessage own">
                    <p>message is this</p>
                    <span>one hour ago</span>
                </div>
            </div>
            <div className="down">
                <textarea></textarea>
                <button>send</button>
            </div>
        </div>}
    </div>
  )
}
