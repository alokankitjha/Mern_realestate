import React, { useState } from 'react';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import axios from 'axios';

const Cloudy = ({ setAvatar }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'alokjha'); // Replace with your actual upload preset

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dgn0uwicd/image/upload', // Replace 'your_cloud_name' with your Cloudinary cloud name 
       
        formData
      );
      setImageUrl(res.data.secure_url);
      setAvatar(res.data.secure_url); // Update avatar URL
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CloudinaryContext cloudName="dgn0uwicd"> {/* Replace 'your_cloud_name' with your Cloudinary cloud name */}
      <div className="cloudinary-upload">
        <input type="file" onChange={handleImageUpload} />
        {imageUrl && (
          <Image publicId={imageUrl}>
            <Transformation width="100" crop="scale" />
          </Image>
        )}
      </div>
    </CloudinaryContext>
  );
};

export default Cloudy;
