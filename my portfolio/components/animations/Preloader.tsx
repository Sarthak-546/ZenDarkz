'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // React 18/19 strict mode requires explicit GSAP cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(container.current, { opacity: 0, duration: 0.8, ease: "power2.inOut", onComplete });
        }
      });

      tl.to(line.current, { scaleX: 1, duration: 1.2, ease: "expo.inOut" })
        .to(line.current, { scaleY: 40, opacity: 0, duration: 0.8, ease: "power4.inOut" })
        .fromTo(text.current, 
          { y: 50, opacity: 0, clipPath: "inset(100% 0 0 0)" }, 
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1, ease: "expo.out" }, 
          "-=0.6"
        )
        .to(text.current, { opacity: 0, y: -20, duration: 0.6, ease: "power2.in", delay: 0.4 });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={container} className="fixed inset-0 z-50 flex items-center justify-center bg-matte-bg">
      <div ref={line} className="absolute h-[1px] w-full max-w-sm scale-x-0 bg-white/20" />
      <h1 ref={text} className="font-display text-4xl font-light tracking-widest text-white">
        ALEX RIVERA
      </h1>
    </div>
  );
}