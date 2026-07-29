import { useRef } from 'react';
import { DragonDefinitions } from './DragonDefinitions';
import { useDragonAnimation } from './useDragonAnimation';

const DragonBackground = () => {
const screenRef = useRef<SVGGElement>(null);  


useDragonAnimation(screenRef);

  return (
    <svg className="dragon-bg">
      <DragonDefinitions />
      <g id="screen" ref={screenRef} />
    </svg>
  );
};

export default DragonBackground;