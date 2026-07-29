import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";
import { CircularCarousel } from "../carousel/CircularCarousel";
import { CategorySection } from "../category/CategorySection";
import HeroSlide from "./HeroSlide";
import "../../components/hero/hero.css";

export default function Hero() {
  return (
    <div>
      <section className="relative w-screen h-screen bg-black">
        <Canvas
          className="absolute inset-0"
          camera={{ position: [0, 0, 12], fov: 50 }}
        >
          <ParticleField />
        </Canvas>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

          <h1 className="hero-title">
            DALLT
          </h1>
        </div>
      </section>
      <section>
        <CircularCarousel />
      </section>
      <section>
        <HeroSlide />
      </section>
      <section>
        <CategorySection />
      </section>
    </div>
  );
}