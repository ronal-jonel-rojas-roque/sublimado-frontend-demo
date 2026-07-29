import type { CarouselItemData } from "../../types/carousel.types";

interface Props {
  data: CarouselItemData;
  isActive: boolean;
  onClick: () => void;
  style: React.CSSProperties; 
}

export const CarouselItem: React.FC<Props> = ({ data, isActive, onClick, style }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute transition-all duration-700 ease-in-out flex items-center justify-center 
        ${isActive ? 'z-20 opacity-100 scale-125' : 'z-10 opacity-60 hover:opacity-90 scale-90'}`}
      style={{
        ...style,
        transitionProperty: 'transform, opacity, scale',
      }}
    >
      <div className={`rounded-full border-4 border-white shadow-2xl overflow-hidden 
        ${isActive ? 'w-40 h-40' : 'w-24 h-24'}`}>
        <img src={data.imageSrc2} alt={data.title} className="w-full h-full object-cover" />
      </div>
    </button>
  );
};