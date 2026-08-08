import { useEffect } from 'react';

export function usePageTitle() {
  useEffect(() => {
    const originalTitle = "DALLT | Ropa Deportiva Sublimada";
    const awayTitles = [
      "¡Te extrañamos! 🥺",
      "DALLT te espera... 👕",
      "¡Vuelve por tus prendas! ⚡"
    ];

    let intervalId: ReturnType<typeof setInterval>;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        let index = 0;
        document.title = awayTitles[0];
        
        intervalId = setInterval(() => {
          index = (index + 1) % awayTitles.length;
          document.title = awayTitles[index];
        }, 2500);
      } else {
        // Restaura el título original cuando vuelve
        clearInterval(intervalId);
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(intervalId);
    };
  }, []);
}