import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface ImageGalleryProps {
    images: string[];
}


const ImageGallery = ({ images } : ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleImages] = useState(5); 
  const animationDuration = 300;
  const maxZoomPixelRatio = 2;
  const zoomInMultiplier = 2;
  const doubleTapDelay = 200;
  const doubleClickDelay = 200;
  const doubleClickMaxStops = 2;
  const keyboardMoveDistance = 50;
  const wheelZoomDistanceFactor = 100;
  const pinchZoomDistanceFactor = 100;
  const scrollToZoom = false;
  
  const nextSlide = () => {
    setCurrentImageIndex((currentIndexVal) => {
      if (currentIndexVal < images.length - 1) return currentIndexVal + 1;
      else return currentIndexVal
    });
    setCurrentSlide((prevSlide) => {
      
      
      let newSlide = prevSlide
      console.log('currentImageIndex', currentImageIndex);
      console.log('prevSlide + vis', prevSlide + visibleImages);
      
      if(currentImageIndex === prevSlide + visibleImages - 1) return newSlide = prevSlide + 1;
      if (newSlide > images.length - visibleImages) return newSlide = images.length - visibleImages;
      return newSlide;
    });


    console.log('Next');
  };

  const prevSlide = () => {
    setCurrentImageIndex((currentIndexVal) => {
      if (currentIndexVal > 0) return currentIndexVal - 1;
      else return currentIndexVal
    });
    setCurrentSlide((prevSlide) => {

      let newSlide = prevSlide
      console.log('currentImageIndex', currentImageIndex);
      console.log('prevSlide + vis', prevSlide);
      if(currentImageIndex === prevSlide) return newSlide = prevSlide - 1;
      if (newSlide < 0) return newSlide = 0;
      return newSlide;
    });
  };

  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <img 
          src={images[currentImageIndex]} 
          onClick={ () => setLightboxOpen(true)}
          alt="Displayed"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center">
      <div className="flex justify-center py-3 gap-2">
        { images.length >= 5 &&
      <button onClick={prevSlide} disabled={currentImageIndex === 0}
      className=" disabled:opacity-10 p-2 rounded">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
}

        {images.slice(currentSlide, currentSlide + visibleImages).map((image, index) => ( 
          <div key={index} className={`h-fit transition ease-in-out duration-200 hover:scale-110 rounded-lg ${currentImageIndex === index && 'border-2 border-black '}`}>
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded cursor-pointe "
              onClick={() => setCurrentImageIndex(index + currentSlide)}
            />
          </div>
        ))}
        {images.length >= 5 &&  <button onClick={nextSlide} disabled={currentImageIndex === images.length - 1}
          className=" p-2 rounded disabled:opacity-10">
          <ArrowRightIcon className="w-6 h-6" />
        </button>}
               
      </div>

      <div className="flex justify-between w-full px-4">
        
      </div>
    </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images.map((image) => {
          return {
            src: image,
            alt: "image 1",
            width: 3840,
            height: 2560,
          }
         })
      }
      plugins={[Zoom]}
      animation={{ zoom: animationDuration }}
      zoom={{
        maxZoomPixelRatio,
        zoomInMultiplier,
        doubleTapDelay,
        doubleClickDelay,
        doubleClickMaxStops,
        keyboardMoveDistance,
        wheelZoomDistanceFactor,
        pinchZoomDistanceFactor,
        scrollToZoom,
      }}
      />
    </div>
  );
};

export default ImageGallery;
