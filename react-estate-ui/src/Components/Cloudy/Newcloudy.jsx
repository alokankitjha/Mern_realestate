import React, { useState } from 'react';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import axios from 'axios';

const Newcloudy = ({ setAvatar }) => {
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'alokjha'); // Replace with your actual upload preset

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dgn0uwicd/image/upload', // Replace 'your_cloud_name' with your Cloudinary cloud name
          formData
        );
        return res.data.secure_url;
      } catch (error) {
        console.error(error);
        return null;
      }
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    const filteredUrls = uploadedUrls.filter((url) => url !== null);

    setImageUrls([...imageUrls, ...filteredUrls]);
    setAvatar([...imageUrls, ...filteredUrls]); // Update avatar state with an array of image URLs
  };

  const handleDeleteImage = (index) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
    setAvatar(newImageUrls); // Update avatar state when an image is deleted
  };

  return (
    <CloudinaryContext cloudName="your_cloud_name"> {/* Replace 'your_cloud_name' with your Cloudinary cloud name */}
      <div className="cloudinary-upload">
        <input type="file" onChange={handleImageUpload} multiple /> {/* Allow multiple file selection */}
        <div className="image-preview-container">
          {imageUrls.map((url, index) => (
            <div key={index} className="image-preview">
              <Image publicId={url}>
                <Transformation width="100" crop="scale" />
              </Image>
              <button onClick={() => handleDeleteImage(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </CloudinaryContext>
  );
};

export default Newcloudy;
