import React, { useState } from 'react';

interface ImageGalleryProps {
    images: string[];
}


const ImageGallery = ({ images } : ImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(images[0]);


  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <img 
          src={currentImage} 
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
    </div>
  );
};

export default ImageGallery;
