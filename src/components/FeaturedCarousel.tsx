import React, { useState, useEffect } from 'react';

const FeaturedCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? 1 : 0));
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div className="sliderAx h-auto">
      <div className={`container mx-auto transition-opacity duration-400 ${currentSlide === 0 ? 'block' : 'hidden'}`}>
        <div className='w-full h-[300px] bg-white rounded-lg'>
        <span className="text-4xl font-bold text-gray-700">Featured Properties</span>
        </div>
      </div>

      <div className={`container mx-auto transition-opacity duration-400 ${currentSlide === 1 ? 'block' : 'hidden'}`}>
      <div className='w-full h-[300px]'>

        <span className="text-4xl font-bold text-gray-700">Featured Properties</span>
      </div>
      </div>

      <div className="flex justify-between w-12 mx-auto pb-2">
        <button onClick={() => setCurrentSlide(0)} className={`bg-purple-400 rounded-full w-4 pb-2 ${currentSlide === 0 ? 'bg-purple-800' : ''}`}></button>
        <button onClick={() => setCurrentSlide(1)} className={`bg-purple-400 rounded-full w-4 p-2 ${currentSlide === 1 ? 'bg-purple-800' : ''}`}></button>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
