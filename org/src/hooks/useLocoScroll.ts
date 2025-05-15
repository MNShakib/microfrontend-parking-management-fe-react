import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const useLocoScroll = () => {
  useEffect(() => {
    const scrollEl = document.querySelector('[data-scroll-container]') as HTMLElement | null;

    if (scrollEl) {
      const scroll = new LocomotiveScroll({
        el: scrollEl,
        smooth: true,
        lerp: 0.08,
      });
      return () => scroll.destroy();
    }
  }, []);
};

export default useLocoScroll;