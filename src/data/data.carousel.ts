import type { CarouselItemData } from "../types/carousel.types";
import img1 from "../assets/carousel/carousel1.webp";
import img1_1 from "../assets/carousel/carousel1-1.webp";
import img2 from "../assets/carousel/carousel2.webp";
import img2_1 from "../assets/carousel/carousel2-1.webp";
import img3 from "../assets/carousel/carousel3.webp";
import img3_1 from "../assets/carousel/carousel3-1.webp";
import img4 from "../assets/carousel/carousel4.webp";
import img4_1 from "../assets/carousel/carousel4-1.webp";
import img5 from "../assets/carousel/carousel5.webp";
import img5_1 from "../assets/carousel/carousel5-1.webp";
import img6 from "../assets/carousel/carousel6.webp";
import img6_1 from "../assets/carousel/carousel6-1.webp";

export const carouselData: CarouselItemData[] = [
    {
        id: 1,
        title: "Diseño a Medida",
        description: "Personalizamos cada detalle, desde el logo hasta los colores, según tu estilo.",
        imageSrc: img1_1,
        imageSrc2: img1
    },
    {
        id: 2,
        title: "Tecnología Dry-Fit",
        description: "Telas transpirables de alto rendimiento diseñadas para el máximo esfuerzo.",
        imageSrc: img2_1,
        imageSrc2: img2
    },
    {
        id: 3,
        title: "Colores Vibrantes",
        description: "Sublimación de alta resolución que no se decolora con las lavadas.",
        imageSrc: img3_1,
        imageSrc2: img3
    },
    {
        id: 4,
        title: "Para tu Equipo",
        description: "Equipamos desde clubes amateur hasta ligas profesionales con precios especiales.",
        imageSrc: img4_1,
        imageSrc2: img4
    },
    {
        id: 5,
        title: "Gaming & Esports",
        description: "Jerseys pro para streamers y equipos de e-sports con diseños vanguardistas.",
        imageSrc: img5_1,
        imageSrc2: img5
    },
    {
        id: 6,
        title: "Calidad Garantizada",
        description: "Costuras reforzadas y materiales premium para una durabilidad excepcional.",
        imageSrc: img6_1,
        imageSrc2: img6
    }
];