'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';

const HeroCanvas = dynamic(
  () => import('./HeroFluid').then((mod) => mod.HeroCanvas),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <HeroCanvas />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-neutral-400 backdrop-blur-md"
          >
            System Status: Online
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl font-medium tracking-tight text-white md:text-8xl lg:text-9xl"
          >
            Engineering <br />
            <span className="text-neutral-500">the unseen.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl font-sans text-lg leading-relaxed text-neutral-400"
          >
            I build digital experiences that operate at the intersection of heavy engineering and cinematic design.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto group mt-12 flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-transform hover:scale-105"
          >
            Initialize Sequence
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}