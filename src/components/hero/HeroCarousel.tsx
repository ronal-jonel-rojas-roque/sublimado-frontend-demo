import { useState, useEffect } from 'react';

const images = [
  `${import.meta.env.BASE_URL}banners/promos1.webp`,
  `${import.meta.env.BASE_URL}banners/promos2.webp`,
  `${import.meta.env.BASE_URL}banners/promos3.webp`,
  `${import.meta.env.BASE_URL}banners/promos4.webp`,
];

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`absolute w-full h-full object-cover object-center transition-opacity duration-500 ${index === current ? 'opacity-100' : 'opacity-0'}`}
          alt="Banner promocional"
        />
      ))}
    </div>
  );
};