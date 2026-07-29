export default function CustomExtras() {
  const features = [
    {
      icon: "⚡",
      title: "Sublimación HD",
      description: "Colores vibrantes y de alta durabilidad que no se desvanecen ni cuartean con los lavados.",
    },
    {
      icon: "🧵",
      title: "Telas Tecnológicas",
      description: "Materiales transpirables y suaves al tacto, diseñados tanto para alto rendimiento como uso diario.",
    },
    {
      icon: "✨",
      title: "Previsualización Real",
      description: "Diseña en tiempo real y visualiza exactamente cómo quedará tu prenda antes de finalizar.",
    },
  ];

  return (
    <div className="w-full bg-black text-white py-20 px-4 md:px-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <h3 className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">
            Calidad Garantizada
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            ¿Por qué personalizar con DALLT?
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
            Combinamos tecnología de impresión avanzada con textiles premium para ofrecerte resultados profesionales.
          </p>
        </div>

        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-zinc-950 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col items-start shadow-xl"
            >
              <div className="text-3xl mb-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                {item.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">
                {item.title}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Banner de llamada a la acción inferior */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-black border border-white/10 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              ¿Tienes dudas con tu diseño o necesitas mayoreo?
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-xl">
              Nuestro equipo de expertos te asesora paso a paso para que tus prendas queden exactamente como las imaginas.
            </p>
          </div>
          <a
            href="https://wa.me/989505663"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20 text-sm"
          >
            Hablar por WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}