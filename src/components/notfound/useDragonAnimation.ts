import { useEffect } from 'react';

export const useDragonAnimation = (svgRef: React.RefObject<SVGElement | null>) => {    
  useEffect(() => {
    if (!svgRef.current) return;
    const screen = svgRef.current;
    screen.innerHTML = '';
    const xmlns = "http://www.w3.org/2000/svg";
    const xlinkns = "http://www.w3.org/1999/xlink";
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    const N = 40;
    const elems = Array.from({ length: N }, () => ({ use: null as SVGUseElement | null, x: width / 2, y: 0 }));
    const pointer = { x: width / 2, y: height / 2 };
    const radm = Math.min(pointer.x, pointer.y) - 20;
    let frm = Math.random();
    let rad = 0;
    let animationId: number; // Declaramos aquí para poder cancelarlo

    const prepend = (useId: string, i: number) => {
      const elem = document.createElementNS(xmlns, "use");
      elems[i].use = elem;
      // CORRECCIÓN: usamos useId en lugar de use
      elem.setAttributeNS(xlinkns, "xlink:href", "#" + useId); 
      screen.prepend(elem);
    };

    for (let i = 1; i < N; i++) {
      if (i === 1) prepend("Cabeza", i);
      else if (i === 8 || i === 14) prepend("Aletas", i);
      else prepend("Espina", i);
    }

    const run = () => {
      const e = elems[0];
      const ax = (Math.cos(3 * frm) * rad * width) / height;
      const ay = (Math.sin(4 * frm) * rad * height) / width;
      e.x += (ax + pointer.x - e.x) / 10;
      e.y += (ay + pointer.y - e.y) / 10;
      
      for (let i = 1; i < N; i++) {
        const e = elems[i];
        const ep = elems[i - 1];
        if (!e.use) continue; // Seguridad extra
        const a = Math.atan2(e.y - ep.y, e.x - ep.x);
        e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
        e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;
        const s = (162 + 4 * (1 - i)) / 50;
        e.use.setAttributeNS(null, "transform", `translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${(180 / Math.PI) * a}) scale(${s},${s})`);
      }
      if (rad < radm) rad++;
      frm += 0.003;
      if (rad > 60) {
        pointer.x += (width / 2 - pointer.x) * 0.05;
        pointer.y += (height / 2 - pointer.y) * 0.05;
      }
      
      animationId = requestAnimationFrame(run);
    };

    // Iniciamos la animación
    animationId = requestAnimationFrame(run);

    const handlePointerMove = (e: PointerEvent) => { pointer.x = e.clientX; pointer.y = e.clientY; rad = 0; };
    const handleResize = () => { width = window.innerWidth; height = window.innerHeight; };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);

    // Limpieza
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [svgRef]);
};