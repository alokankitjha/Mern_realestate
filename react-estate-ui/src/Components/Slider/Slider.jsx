import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./Slider.scss";

export default function Slider({ images }) {
  const [open, setOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const firstImage = images[0];
  const smallImages = images.slice(1,5);

  const slides = images.map((url) => ({ src: url }));

  return (
    <>
      <div className="gallery">
        <img
          src={firstImage}
          alt="First Image"
          className="first-img"
          onClick={() => handleOpen(0)}
        />
        <div className="small-images">
          {smallImages.map((url, index) => (
            <img
              key={index}
              src={url} 
              alt={`Image ${index + 1}`}
              className="gallery-img"
              onClick={() => handleOpen(index + 1)}
            />
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentIndex}
        onIndexChange={setCurrentIndex} className="alok"
      />
    </>
  );
}









