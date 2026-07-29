interface CategoryHeroProps {
  gender: 'Hombres' | 'Mujeres';
  description: string;
  images: string[];
  onExplore: () => void;
}

export const CategoryHero = ({ gender, description, images, onExplore }: CategoryHeroProps) => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">

        <div className="flex flex-col w-full lg:w-1/3 justify-center items-center md:items-start text-center md:text-left p-8">
          {/* <h1 className="font-italica text-2xl md:text-5xl p-2 text-yellow-300 tracking-loose uppercase">DALLT</h1> */}
          <h1 className="text-2xl md:text-5xl leading-relaxed md:leading-snug mb-2 font-extrabold leading-none tracking-normal">
            <span>CATEGORIA: </span>
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline uppercase">{gender}</span>
          </h1>
          <p className="text-sm md:text-base text-gray-50 mb-4">{description}</p>
          <button
            onClick={onExplore}
            className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 mt-6 border border-yellow-300 hover:border-transparent uppercase">
            Explora nuestros productos
          </button>
        </div>

        {/* Imágenes Dinámicas */}
        <div className="hidden md:flex p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 justify-center">
          <div className="w-full flex justify-center items-center gap-8 lg:gap-16 mt-12 md:mt-0">

            <div className="hidden xl:block">
              <img
                className="w-40 h-64 object-cover rounded-[100px] mt-16 shadow-lg rotate-[-10deg] transition-transform hover:rotate-0 duration-500"
                src={images[0]}
                alt="Imagen 1" />
            </div>

            <div>
              <img
                className="w-56 h-100 object-cover rounded-[100px] shadow-2xl rotate-[-10deg] transition-transform hover:scale-105 duration-500"
                src={images[1]}
                alt="Imagen 2" />
            </div>

            <div className="hidden xl:block">
              <img className="w-40 h-64 object-cover rounded-[100px] mt-16 shadow-lg rotate-[-10deg] transition-transform hover:rotate-0 duration-500"
                src={images[2]}
                alt="Imagen 3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};