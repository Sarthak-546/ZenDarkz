'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const SkillsCanvas = dynamic(
  () => import('./SkillsNetwork').then((mod) => mod.SkillsCanvas),
  { ssr: false }
);

const SKILL_CATEGORIES = [
  {
    title: 'Core Architecture',
    skills: ['TypeScript', 'React 19', 'Next.js 15 (App Router)', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Cinematic Motion',
    skills: ['GSAP / ScrollTrigger', 'Framer Motion', 'Lenis', 'Custom Math/Springs'],
  },
  {
    title: 'Graphics & Rendering',
    skills: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'WebGPU (Exploring)'],
  },
  {
    title: 'Design Engineering',
    skills: ['Tailwind CSS v4', 'Figma', 'Design Systems', 'Performance Auditing'],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative min-h-screen w-full overflow-hidden bg-matte-bg py-32">
      <SkillsCanvas />
      
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center"
        >
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-neutral-500">
            // 02_Arsenal
          </span>
          <h2 className="font-display text-4xl font-medium tracking-tight text-white md:text-6xl">
            The Neural <span className="text-neutral-500">Network.</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md transition-colors hover:border-white/10 hover:bg-white/[0.04]"
            >
              <h3 className="mb-6 font-mono text-sm tracking-widest text-white">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 font-sans text-sm text-neutral-400 transition-colors group-hover:text-neutral-300">
                    <div className="h-[1px] w-4 bg-white/20 transition-all group-hover:w-6 group-hover:bg-white/50" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}