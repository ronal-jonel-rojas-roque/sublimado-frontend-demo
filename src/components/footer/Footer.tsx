// src/components/Footer/Footer.tsx
import { BiShoppingBag } from 'react-icons/bi';
import { FooterCol } from './FooterCol';
import { CiShare2 } from 'react-icons/ci';
import { FacebookIcon, InstagramIcon, SendIcon, YoutubeIcon } from 'lucide-animated';
import styles from './Footer.module.css';
import { BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom'; // 🌟 1. Importar Link de router

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.parallaxLayer}>
        <div className={`${styles.bgLayer}`} style={{ backgroundImage: 'url(https://us.123rf.com/450wm/zolotonsmailru/zolotonsmailru2007/zolotonsmailru200700291/150549419-conjunto-de-silueta-de-%C3%A1rbol-en-un-vector-de-fondo-blanco.jpg?ver=6)', bottom: '-60px', animationDuration: '1000s' }} />
        <div className={`${styles.bgLayer}`} style={{ backgroundImage: 'url(https://i.ibb.co/J3TjC4W/second-plan.png)', animationDuration: '600s' }} />
        <div className={`${styles.bgLayer}`} style={{ backgroundImage: 'url(https://i.ibb.co/RQhDWbk/premierplanv3.png)', animationDuration: '500s', backgroundPosition: '260px' }} />
        <div className={styles.moto} />
        <div className={styles.voiture} />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex justify-center">
        <div className="container mx-auto relative px-4 z-10 bg-black/60 backdrop-blur-sm p-6 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between flex-wrap gap-12 items-center md:items-start text-center md:text-left">

            {/* SOBRE NOSOTROS / ENLACES INTERNOS */}
            <FooterCol title="Sobre Nosotros" icon={<BiShoppingBag />}>
              <li>
                <Link to="/About#proceso" className="flex items-center hover:opacity-80 text-sm md:text-base">
                  Uniformes personalizados
                </Link>
              </li>
              <li>
                <Link to="/About#politicas" className="flex items-center hover:opacity-80 text-sm md:text-base">
                  Politica de confidencialidad
                </Link>
              </li>
              <li>
                <Link to="/About#politicas" className="flex items-center hover:opacity-80 text-sm md:text-base">
                  Politica de devoluciones
                </Link>
              </li>
              <li>
                <Link to="/About#ubicacion" className="flex items-center hover:opacity-80 text-sm md:text-base">
                  Ubicanos
                </Link>
              </li>
            </FooterCol>

            {/* REDES SOCIALES (Enlaces externos) */}
            <FooterCol title="REDES" icon={<CiShare2 />} direction="row">
              <li title="Youtube">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <YoutubeIcon className="w-6 h-6 hover:opacity-80 transition" />
                </a>
              </li>
              <li title="Facebook">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon className="w-6 h-6 hover:opacity-80 transition" />
                </a>
              </li>
              <li title="Instagram">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="w-6 h-6 hover:opacity-80 transition" />
                </a>
              </li>
            </FooterCol>

            {/* CONTACTO */}
            <FooterCol title="CONTACTO" icon={<SendIcon />}>
              <li>
                <a
                  href="mailto:dalltconfecciones@gmail.com"
                  className="hover:opacity-80 text-sm md:text-base"
                >
                  dalltconfecciones@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/51989505663"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center md:justify-start items-center text-sm md:text-base gap-3 hover:opacity-80"
                >
                  <BsWhatsapp /> +51 989505663
                </a>
              </li>
            </FooterCol>

          </div>

          <div className="pt-8 md:pt-12 mt-8 md:mt-12 border-t border-white/20">
            <p className="flex justify-center items-center text-center">
              Realizado por
              <a
                href="https://www.facebook.com/RonalRojasRoqueJ?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 font-bold hover:underline"
              >
                @Haku
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};