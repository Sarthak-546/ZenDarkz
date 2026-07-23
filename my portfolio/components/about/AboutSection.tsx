'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

const TIMELINE_DATA = [
  {
    year: '2023 — Present',
    title: 'Going Independent',
    description: 'Transitioned to full-time freelance, focusing exclusively on high-performance WebGL experiences and cinematic frontend architectures for elite clients.',
    stats: ['12+ Projects Shipped', '99 Avg Lighthouse Score'],
  },
  {
    year: '2021 — 2023',
    title: 'Product Engineering Lead',
    description: 'Architected and scaled a highly interactive React Native ecosystem. Reduced time-to-interactive by 40% through aggressive bundle splitting and native module bridging.',
    stats: ['40% TTI Reduction', '2M+ Active Users'],
  },
  {
    year: '2019 — 2021',
    title: 'The Foundation',
    description: 'Began the journey in the agency trenches. Mastered the DOM, built custom CSS frameworks before Tailwind dominated, and obsessed over frame rates.',
    stats: ['30+ Agency Builds', 'Zero Missed Deadlines'],
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: leftColRef.current,
          pinSpacing: false,
          scrub: true,
        });

        itemsRef.current.forEach((item) => {
          if (!item) return;
          gsap.fromTo(
            item,
            { opacity: 0.2, y: 100, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 40%',
                scrub: true,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full bg-matte-bg py-32 lg:py-0">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-32">
          
          <div ref={leftColRef} className="flex h-auto flex-col justify-center lg:h-screen lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-neutral-500">
                // 01_Evolution
              </span>
              <h2 className="font-display text-4xl font-medium tracking-tight text-white md:text-6xl">
                Obsessed with <br />
                <span className="text-neutral-500">the details.</span>
              </h2>
              <p className="mt-6 max-w-md font-sans text-lg text-neutral-400">
                I approach frontend engineering not just as code, but as digital craftsmanship. It is about understanding the browser's rendering pipeline deeply enough to bend it to your will.
              </p>
            </motion.div>
          </div>

          <div ref={rightColRef} className="flex flex-col gap-24 lg:w-7/12 lg:py-[30vh]">
            {TIMELINE_DATA.map((item, index) => (
              <div 
                key={index} 
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className="relative border-l border-white/10 pl-8 md:pl-12"
              >
                <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-white/20 ring-4 ring-matte-bg" />
                <h3 className="font-mono text-sm tracking-widest text-neutral-500">
                  {item.year}
                </h3>
                <h4 className="mt-4 font-display text-2xl font-medium text-white md:text-3xl">
                  {item.title}
                </h4>
                <p className="mt-4 max-w-xl font-sans leading-relaxed text-neutral-400">
                  {item.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  {item.stats.map((stat, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/5 bg-white/5 px-4 py-2 font-mono text-xs text-neutral-300 backdrop-blur-sm"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}