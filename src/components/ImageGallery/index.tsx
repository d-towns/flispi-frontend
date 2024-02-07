import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css";

interface ImageGalleryProps {
    images: string[];
}


const ImageGallery = ({ images } : ImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false)
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
  


  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <img 
          src={currentImage} 
          onClick={ () => setLightboxOpen(true)}
          alt="Displayed"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div className="flex justify-center py-3 gap-2">
        {images.map((image, index) => (
          <div className='h-fit hover:scale-110 transition ease-in-out duration-200'>
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="w-20 h-20 object-cover rounded cursor-pointer"
            onClick={() => setCurrentImage(image)}
          />
          </div>
        ))}
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
