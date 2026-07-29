import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";



export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeModal, setActiveModal] = useState<'confidencialidad' | 'devoluciones' | null>(null);
  const location = useLocation();

  // Coordenadas aproximadas de Huánuco, Perú
 /*  const huanucoPosition: [number, number] = [-9.9306, -76.2422]; */

  // Efecto para hacer scroll automático si se llega con un hash (ej: /About#proceso)
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Bloquear scroll de la página cuando el modal está abierto
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeModal]);

  const stats = [
    { label: "Prendas Personalizadas", value: "+10k" },
    { label: "Precisión de Sublimación", value: "99.8%" },
    { label: "Clientes Satisfechos", value: "+5k" },
    { label: "Países de Envío", value: "Global" },
  ];

  const values = [
    {
      icon: "🌌",
      title: "Innovación Visual",
      description: "Fusionamos la moda urbana con tecnología de previsualización 3D e impresión de vanguardia.",
    },
    {
      icon: "⚡",
      title: "Velocidad y Precisión",
      description: "Procesos optimizados para que tus diseños cobren vida en el menor tiempo posible y con calidad HD.",
    },
    {
      icon: "🛡️",
      title: "Calidad Implacable",
      description: "Materiales seleccionados que resisten el paso del tiempo, manteniendo los colores intactos.",
    },
  ];

  const carouselItems = [
    "Sublimación HD",
    "•",
    "Diseño 3D en Tiempo Real",
    "•",
    "Textiles Tecnológicos",
    "•",
    "Envíos Seguros",
    "•",
    "Estilo Urbano",
    "•",
  ];

  const steps = [
    {
      number: "01",
      title: "Concepción Digital",
      description: "Tus ideas o gráficos se adaptan con precisión milimétrica a nuestras plantillas virtuales 3D.",
    },
    {
      number: "02",
      title: "Fusión Molecular",
      description: "Utilizamos tintas de sublimación de alta gama que penetran el tejido en lugar de quedarse en la superficie.",
    },
    {
      number: "03",
      title: "Realidad Tangible",
      description: "Recibes una prenda única, transpirable, lista para destacar en cualquier escenario urbano o deportivo.",
    },
  ];

  const faqs = [
    {
      q: "¿Qué formatos de imagen aceptan para personalizar?",
      a: "Recomendamos subir archivos en alta resolución (PNG o JPG con fondo transparente o colores sólidos) para asegurar una nitidez perfecta en la sublimación.",
    },
    {
      q: "¿La impresión se desvanece con los lavados?",
      a: "No. Gracias a nuestra tecnología de sublimación HD, la tinta se fusiona directamente con la fibra del tejido, garantizando que el diseño no se cuartee ni pierda color.",
    },
    {
      q: "¿Cuánto tiempo toma procesar y enviar un pedido personalizado?",
      a: "El proceso de fabricación y control de calidad toma entre 2 y 4 días hábiles, más el tiempo de envío correspondiente a tu zona.",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen px-4 md:px-8 py-10 pt-[var(--navbar-height)] select-none overflow-hidden relative">
      <div className="mx-auto max-w-7xl">
        
        {/* SECCIÓN HERO / ENCABEZADO */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <h3 className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">
            El futuro del diseño textil
          </h3>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            REDEFINIENDO LA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SUBLIMACIÓN</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            En <span className="text-white font-semibold">DALLT</span>, creemos que la ropa es un lienzo en blanco. Rompemos las barreras entre tu imaginación y el mundo real mediante tecnología interactiva y acabados de alta gama.
          </p>
        </div>

        {/* CARRUSEL ANIMADO INFINITO */}
        <div className="relative w-full overflow-hidden bg-zinc-950 border-y border-white/10 py-4 mb-20">
          <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] gap-8 items-center text-sm md:text-base font-semibold tracking-wider text-gray-300">
            {[...carouselItems, ...carouselItems, ...carouselItems].map((item, index) => (
              <span key={index} className={item === "•" ? "text-cyan-400" : "hover:text-cyan-400 transition-colors"}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* SECCIÓN DE ESTADÍSTICAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 text-center shadow-xl group"
            >
              <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-cyan-400 transition-colors mb-1">
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* SECCIÓN: CÓMO TRABAJAMOS / PROCESO */}
        <div id="proceso" className="mb-24 scroll-mt-28">
          <div className="text-center mb-16">
            <h3 className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-3">
              Ingeniería de Producto
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold">El Ciclo de Creación DALLT</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative p-8 rounded-3xl bg-zinc-950 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 mb-6 block">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECCIÓN DE PILARES */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Nuestros Pilares</h2>
            <p className="text-gray-400 text-sm mt-2">Los principios que mueven cada impresión.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, index) => (
              <div
                key={index}
                className="relative p-8 rounded-3xl bg-gradient-to-b from-zinc-900/50 to-zinc-950 border border-white/10 hover:border-white/30 transition duration-300 flex flex-col items-start"
              >
                <div className="text-3xl mb-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                  {val.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {val.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECCIÓN: POLÍTICAS CON RESUMEN Y BOTÓN PARA MODAL */}
        <div id="politicas" className="max-w-4xl mx-auto mb-24 scroll-mt-28">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Políticas Corporativas</h2>
            <p className="text-gray-400 text-sm mt-2">Compromiso, seguridad y transparencia en cada proceso.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Política de Confidencialidad */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Política de Confidencialidad</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Tus diseños personalizados, archivos vectoriales y datos personales están estrictamente protegidos bajo protocolos de cifrado y normativas de privacidad industrial.
                </p>
              </div>
              <button
                onClick={() => setActiveModal('confidencialidad')}
                className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 transition font-semibold text-sm tracking-wide"
              >
                Leer Política Completa
              </button>
            </div>

            {/* Política de Devoluciones */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Política de Devoluciones</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Garantizamos los estándares más altos de calidad. Al tratarse de prendas confeccionadas a medida, establecemos directrices claras para cambios y resolución de incidencias.
                </p>
              </div>
              <button
                onClick={() => setActiveModal('devoluciones')}
                className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 transition font-semibold text-sm tracking-wide"
              >
                Leer Política Completa
              </button>
            </div>
          </div>
        </div>

      {/* SECCIÓN: UBÍCANOS CON MAPA LIMPIO (IFRAME OSM) */}
        <div id="ubicacion" className="max-w-4xl mx-auto mb-24 scroll-mt-28">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Ubícanos</h2>
            <p className="text-gray-400 text-sm mt-2">Centro de operaciones y despacho centralizado.</p>
          </div>

          <div className="p-4 md:p-6 rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl">
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-300">
                📍 Operaciones principales en <span className="text-cyan-400 font-semibold">Huánuco, Perú</span>. Despachos seguros a nivel nacional.
              </p>
            </div>

            {/* Contenedor del Mapa Integrado */}
            <div className="w-full h-[350px] md:h-[420px] rounded-2xl overflow-hidden border border-white/10 relative z-0 filter invert hue-rotate-180 brightness-95 contrast-125">
              <iframe
                title="Ubicación DALLT - Huánuco"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-76.2622%2C-9.9506%2C-76.2222%2C-9.9106&amp;layer=mapnik&amp;marker=-9.9306%2C-76.2422"
                style={{ border: 0 }}
              ></iframe>
            </div>
            
            <div className="mt-3 text-center">
              <a 
                href="https://www.openstreetmap.org/?mlat=-9.9306&amp;mlon=-76.2422#map=13/-9.9306/-76.2422" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:underline inline-flex items-center gap-1"
              >
                Ver mapa ampliado en una pestaña nueva ↗
              </a>
            </div>
          </div>
        </div>

        {/* SECCIÓN DE PREGUNTAS FRECUENTES (FAQ) */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Preguntas Frecuentes</h2>
            <p className="text-gray-400 text-sm mt-2">Todo lo que necesitas saber antes de crear.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between font-semibold text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-cyan-400 text-xl font-mono">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* BANNER INTERACTIVO DE CIERRE */}
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 border border-cyan-500/30 p-8 md:p-14 text-center shadow-2xl mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />
          
          <h3 className="text-2xl md:text-4xl font-bold mb-4 relative z-10">
            ¿Listo para crear algo único?
          </h3>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-8 relative z-10">
            Lleva tus ideas al siguiente nivel utilizando nuestro personalizador 3D en tiempo real.
          </p>
          <a
            href="/Custom"
            className="inline-block relative z-10 px-8 py-4 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/25 text-sm tracking-wide uppercase"
          >
            Empezar a Diseñar
          </a>
        </div>

      </div>

      {/* MODAL DE POLÍTICA DE CONFIDENCIALIDAD */}
      {activeModal === 'confidencialidad' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/15 rounded-3xl p-6 md:p-10 shadow-2xl text-left">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
            >
              ✕
            </button>

            <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">Política de Confidencialidad y Privacidad</h3>
            <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">Dallt Confecciones • Actualización 2026</p>

            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <h4 className="font-semibold text-white text-base mt-4">1. Recopilación de Información y Activos Gráficos</h4>
              <p>
                En <strong>DALLT</strong>, valoramos y respetamos profundamente la propiedad intelectual de nuestros clientes. Los archivos de imagen, logotipos, vectores e ideas enviados a través de nuestra plataforma o canales de atención directa son recopilados exclusivamente para la ejecución técnica, el mapeo 3D y la sublimación del producto solicitado.
              </p>

              <h4 className="font-semibold text-white text-base mt-4">2. Protección y No Divulgación</h4>
              <p>
                Garantizamos que bajo ninguna circunstancia comercializaremos, cederemos, publicaremos con fines ajenos ni compartiremos tus diseños con terceros. Los archivos se almacenan en servidores seguros con accesos restringidos exclusivamente al personal de producción operativa.
              </p>

              <h4 className="font-semibold text-white text-base mt-4">3. Derechos de Propiedad Intelectual</h4>
              <p>
                El cliente declara poseer los derechos de uso o autorizaciones legales sobre los gráficos cargados en el personalizador. DALLT queda exento de cualquier responsabilidad legal derivada de infracciones de derechos de autor cometidas por terceros en el uso de sus diseños personalizados.
              </p>

              <h4 className="font-semibold text-white text-base mt-4">4. Privacidad de Datos Personales</h4>
              <p>
                Los datos de contacto (nombre, teléfono, correo electrónico y dirección de entrega) son tratados con estricta confidencialidad y se utilizan de forma exclusiva para la gestión de envíos, confirmación de pedidos y notificaciones de estado de fabricación.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition text-sm"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE POLÍTICA DE DEVOLUCIONES */}
      {activeModal === 'devoluciones' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/15 rounded-3xl p-6 md:p-10 shadow-2xl text-left">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
            >
              ✕
            </button>

            <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">Política de Cambios y Devoluciones</h3>
            <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest">Dallt Confecciones • Estándares de Garantía</p>

            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <h4 className="font-semibold text-white text-base mt-4">1. Naturaleza de los Productos Personalizados</h4>
              <p>
                Debido a que cada prenda en <strong>DALLT</strong> es fabricada, cortada y sublimada bajo demanda y según las especificaciones exactas proporcionadas por el usuario en nuestro entorno 3D, <strong>no se aceptan devoluciones por remordimiento de compra, cambios de opinión o errores en el diseño aprobado por el cliente</strong> antes de la producción.
              </p>

              <h4 className="font-semibold text-white text-base mt-4">2. Causales Válidas para Reclamos y Cambios</h4>
              <p>
                Aceptaremos solicitudes de cambio o corrección de forma totalmente gratuita en los siguientes supuestos comprobados:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li>Defectos de fábrica en la costura, urdimbre o integridad estructural del textil.</li>
                <li>Fallos graves de impresión o alteraciones involuntarias imputables a nuestros procesos de sublimación.</li>
                <li>Error operativo de envío en la talla base o modelo con respecto al comprobante de compra emitido.</li>
              </ul>

              <h4 className="font-semibold text-white text-base mt-4">3. Plazos y Procedimiento de Reporte</h4>
              <p>
                Cualquier incidencia debe ser reportada formalmente a través de nuestros canales de contacto oficiales dentro de un plazo máximo de <strong>7 (siete) días calendario</strong> contados a partir de la fecha de entrega del pedido, adjuntando fotografías claras que evidencien el inconveniente.
              </p>

              <h4 className="font-semibold text-white text-base mt-4">4. Condiciones del Producto</h4>
              <p>
                Para proceder con la evaluación de un cambio, la prenda debe encontrarse sin uso, sin señales de lavado, con sus etiquetas originales intactas y en su empaque primario de recepción.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition text-sm"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}