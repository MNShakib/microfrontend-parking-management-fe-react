declare module 'locomotive-scroll' {
    export default class LocomotiveScroll {
      constructor(options?: {
        el: HTMLElement | null;
        smooth?: boolean;
        direction?: 'vertical' | 'horizontal';
        lerp?: number;
        class?: string;
        getDirection?: boolean;
        getSpeed?: boolean;
      });
  
      destroy(): void;
      update(): void;
    }
  }
  