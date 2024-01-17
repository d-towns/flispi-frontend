import React, { useState, useEffect, useMemo } from 'react';
import './ImageCarousel.css'; 


const ImageCarousel = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isShowing, setIsShowing] = useState(true);

  const images = useMemo(() => {
    return [
      'lb_3.jpeg',
      'lb_2.jpeg',
      'lb_4.jpeg',
    ]
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      
      setIsShowing(false);  // Hide image before changing to the next image
      // wait 3 seconds for the fade-out transition to complete before changing the image


    }, 6000);  // 10000 ms = 10 s
    
    return () => clearInterval(interval);
  }, []);  // Empty dependency array to run useEffect once

  useEffect(() => {
    setTimeout(() => { 
      if (!isShowing) {

        
      
      
        // Change image only after the previous image has faded out
        setImageIndex(prevIndex => (prevIndex + 1) % images.length);  // Show the new image after 1 s
        setIsShowing(true);  // Show the new image
      }
    }, 500);
  }, [isShowing, images]);  // Run this useEffect whenever isShowing changes

  return (
    <div className={`image-container h-[200px] sm:h-[300px] lg:h-[500px] w-full rounded-md mx-4 mt-16 ${isShowing ? 'shadow-xl' : ''} `}>
      <div className="h-full object-cover rounded-lg z-0 mx-auto">
        {/* <img src='./DT_BULB_DARK.png' alt="Property" className="h-full w-full rounded-lg" /> */}
        </div>
      <img
        alt='Map Logo'
        className={`fade-image ${isShowing ? 'show' : ''}`}
        src={images[imageIndex]}
      />
    </div>
  );
};

export default ImageCarousel;
