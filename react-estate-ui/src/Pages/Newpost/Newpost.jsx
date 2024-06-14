import { useState } from "react";
import "./Newpost.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Authcontext } from "../../Authcontext";
import { useContext } from "react";
import axios from "axios";
import Newcloudy from "../../Components/Cloudy/Newcloudy";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../Lib/Apirequest";

function Newpost() {
  const [value, setValue] = useState("");
  const navigate =useNavigate();
 
  const [error, seterror] = useState("");
  const { currentuser } = useContext(Authcontext);
  const [avatar, setAvatar] = useState([]);
  console.log(currentuser);
  console.log(avatar);
  const handlesubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const inputs = Object.fromEntries(formdata);
     console.log(inputs.property)
    try {
      const res = await apiRequest.post(
        `post/${currentuser.message.id}`,
        {
          postdata: {
            title: inputs.title,
            price: parseInt(inputs.price),
            address: inputs.address,
          img:avatar,
            city: inputs.city,
            bedroom: parseInt(inputs.bedroom),
            bathroom: parseInt(inputs.bathroom),
            latitude: inputs.latitude,
            longitude: inputs.longitude,

            type: inputs.type,
            property: inputs.property
          },
          postdetail: {
            desc: value, // Assuming value captures description from ReactQuill
            pet: inputs.pet,
            utilties: inputs.utilities, // Assuming this is correct
            income: inputs.income,
            size: parseInt(inputs.size),
            school: parseInt(inputs.school),
            bus: parseInt(inputs.bus),
            restaurant: parseInt(inputs.restaurant),
          },
        }
      );
      console.log(res);
    
    
  //  console.log(res.data.newpost.id)
       navigate("/"+res.data.newpost.id)
    } catch (error) {
      console.log(error);
      seterror(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handlesubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>

            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  rent
                </option>
                <option value="buy">buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select name="property">
              
                <option value="house">house</option>
                <option value="apartment">apt</option>
                <option value="condo">condo</option>
                <option value="land">land</option>
               
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Add</button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
      <Newcloudy setAvatar={setAvatar} />
      </div>
    </div>
  );
}

export default Newpost;
