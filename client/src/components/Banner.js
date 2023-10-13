import React, { useState } from "react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    "https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg",
    "https://amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg",
    "https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg",
    "https://amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg",
  ];
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : currentSlide - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : currentSlide + 1);
  };
  return (
    <div className="w-full h-auto relative overflow-hidden">
      <div
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        className="w-screen h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] flex transition-transform duration-1000 object-cover"
      >
        {data.map((image, index) => (
          <img
            key={index}
            className="w-screen md:w-full h-full"
            src={image}
            alt={`Image${index + 1}`}
            loading="priority"
          />
        ))}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-100 text-gray-700 rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-300" onClick={prevSlide}>
        <HiArrowLeft />
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-12 h-12 bg-gray-100 text-gray-700 rounded-full cursor-pointer flex items-center justify-center hover-bg-gray-300" onClick={nextSlide}>
        <HiArrowRight />
      </div>
    </div>
  );
};

export default Banner;
