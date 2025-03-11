
import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Remove the # from the start of the id
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  }, []);

  return { scrollToSection };
};
