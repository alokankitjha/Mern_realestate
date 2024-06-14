import React from 'react'
import "./Card.scss"
import { listData } from '../../Lib/Dummydata'
import { Link } from 'react-router-dom'
import pin from "../../../public/pin.png"
import bed from "../../../public/bed.png"
import bathroom from "../../../public/bath.png"
import save from "../../../public/save.png"
import chat from "../../../public/chat.png"
import { createClient } from 'pexels';
import { useEffect } from 'react'
import { useState } from 'react'

export default function Card({data}) {
  const API_KEY = 'z5lWL0w57JnwGtUT3ajV6kXtCk8KGyw2Xx9crO0pe20AtM87umeTzVvh';
  const client = createClient(API_KEY);
  const query = data.title;
  const [photoArray, setPhotoArray] = useState([]);
  console.log(data)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photos = await client.photos.search({ query, per_page: 4 });
        const randomPhotos = [];
        const usedIndices = new Set();

        while (randomPhotos.length < 4 && photos.photos.length > 0) {
          const randomIndex = Math.floor(Math.random() * photos.photos.length);
          if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            randomPhotos.push(photos.photos[randomIndex].src.medium); // Use a smaller size
          }
        }

        setPhotoArray(randomPhotos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [query]);
  console.log(data.id)
  return (
   <div className="card">
       <div className="maincarrd">
        <Link to={`/${data.id}`} className="cardimg"><img src={photoArray[0]} /></Link>
        <div className="carddata">
         <Link  to={`/${data.id}`} > <h2 className="cardtitle">{data.title}</h2></Link>
          <p><img src={pin} />
          <span>{data.address}</span></p>
          <p className="price"> $ {data.price}</p>
          <div className="bottom">
          <div className="feature">
          <div className="features">
              <img  src={bed}/>
              <span>{data.bedroom} Bedroom</span>
            </div>
            <div className="features">
              <img  src={bathroom}/>
              <span>{data.bathroom} Bathroom</span>
            </div>
          </div>
          <div className="logo">
            <div className="logo1"><img src={save}/></div>
            <div className="logo1"><img src={chat}/></div>
          </div>
         
          </div>
        </div>
       </div>
    

   </div>
  )
}
