import React, { useState, useEffect, useContext } from "react";
import "./Singlepage.scss";
import Slider from "../../Components/Slider/Slider";
//import { singlePostData } from "../../Lib/Dummydata";
import pin from "../../../public/pin.png";
import { userata } from "../../Lib/Dummydata";
import utilities from "../../../public/utility.png";
import pet from "../../../public/pet.png";
import fee from "../../../public/fee.png";
import size from "../../../public/size.png";
import bed from "../../../public/bed.png";
import bath from "../../../public/bath.png";
import Map from "../../Components/Map/Map"; // Correct import
import save from "../../../public/save.png";
import chat from "../../../public/chat.png";
import { useLoaderData, useNavigate } from "react-router-dom";
import { createClient } from 'pexels';
import DOMPurify from "dompurify";
import { Authcontext } from "../../Authcontext";
import {apiRequest} from "../../Lib/Apirequest";

export default function Singlepage() {
  const post = useLoaderData();
console.log(post)
  const singlePostData = post;
 // console.log(singlePostData)
  const API_KEY = 'z5lWL0w57JnwGtUT3ajV6kXtCk8KGyw2Xx9crO0pe20AtM87umeTzVvh';
  const client = createClient(API_KEY);
  const query = singlePostData.title;
  const [photoArray, setPhotoArray] = useState([]);

  const [saved, setSaved] = useState(post.isSaved); 
  const {currentuser }=useContext(Authcontext)
  const navigate = useNavigate()
  const handlesave = async () => {
    if (!currentuser) {
      navigate("/login");
      return; // Prevent further execution if the user is not logged in
    }

    setSaved((prev) => !prev); // Optimistically update UI

    try {
      const response = await apiRequest.post("/user/save", { postid: post.id });
      console.log('Save response:', response); // Log the server response
      // Optionally update saved state based on response if necessary
    } catch (err) {
      console.error('Error saving post:', err);
      setSaved((prev) => !prev); // Revert state on error
    }
  }


  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photos = await client.photos.search({ query, per_page:4 }); // Fetch more photos to increase randomness
        const randomPhotos = [];
        const usedIndices = new Set();

        while (randomPhotos.length < 4) { // Select 3 random photos
          const randomIndex = Math.floor(Math.random() * photos.photos.length);
          if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            randomPhotos.push(photos.photos[randomIndex].src.medium);
          }
        }

        setPhotoArray(randomPhotos);
       // console.log(randomPhotos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPhotos();
  }, []);



  const sanitizedDesc = DOMPurify.sanitize(singlePostData.postdetail.desc);

  return (
    <div className="singlepage">
      <div className="details">
        <div className="wrappersingle">
          <Slider images={singlePostData.img[3]?singlePostData.img:photoArray}></Slider>
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src={pin} alt="pin" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="newbox">
                  <div className="price">$ {singlePostData.price}</div>
                  <div className="price"> {singlePostData.type}</div>
                  <div className="price"> {singlePostData.property}</div>
                </div>
              </div>
              <div className="usering">
                <div className="userimg">
                  <img
                    src={singlePostData.User.avatar}
                    height="100px"
                    width="100px"
                    alt="user"
                  />
                </div>
                <h1>{singlePostData.User.username}</h1>
              </div>
            </div>
            <p className="bottom" dangerouslySetInnerHTML={{ __html: sanitizedDesc }}></p>
          </div>
        </div>
      </div>
      <div className="features2">
        <div className="wrappersingle2">
          <div className="good">
            <div className="general">
              <h1>General</h1>
              <div className="generalbox">
                <div className="boxes1">
                  <img src={utilities} alt="utilities" />
                  <div className="boxes2">
                    <h1>{singlePostData.postdetail.utilties}</h1>
                    <p className="p">Renter is not responsible</p>
                  </div>
                </div>
                <div className="boxes1">
                  <img src={pet} alt="pet" />
                  <div className="boxes2">
                    <h1>Pet policy</h1>
                    <p className="p">{singlePostData.postdetail.pet}</p>
                  </div>
                </div>
                <div className="boxes1">
                  <img src={fee} alt="fee" />
                  <div className="boxes2">
                    <h1>Income</h1>
                    <p className="p">{singlePostData.postdetail.income}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="roomsize">
              <h1>Room sizes</h1>
              <div className="roomsizebox">
                <div className="a">
                  <img src={size} alt="size" />
                  <h1>{singlePostData.postdetail.size} sqkm</h1>
                </div>
                <div className="a">
                  <img src={bed} alt="bed" />
                  <h1>{singlePostData.bed} bed</h1>
                </div>
                <div className="a">
                  <img src={bath} alt="bath" />
                  <h1>{singlePostData.bathroom} bathroom</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="general">
            <h1>Nearby places</h1>
            <div className="generalbox2">
              <div className="boxes1">
                <img src={utilities} alt="school" />
                <div className="boxes2">
                  <h1>school</h1>
                  <p className="p">{singlePostData.postdetail.school} away</p>
                </div>
              </div>
              <div className="boxes1">
                <img src={pet} alt="bus" />
                <div className="boxes2">
                  <h1>Bus stop</h1>
                  <p className="p">{singlePostData.postdetail.bus} away</p>
                </div>
              </div>
              <div className="boxes1">
                <img src={fee} alt="restaurant" />
                <div className="boxes2">
                  <h1>restaurant</h1>
                  <p className="p">
                    {singlePostData.postdetail.restaurant}m away
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mapbox">
        <Map data={singlePostData} /> 
          </div>

          <div className="buttonsbox">
            <button>
              <img src={chat} alt="chat" /> send a message
            </button>
            <button onClick={handlesave}  style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}>
              <img src={save} alt="save" />  {saved ? "Place Saved" : "Save the Place"}
            </button>
         
          </div>
        </div>
      </div>
    </div>
  );
}
