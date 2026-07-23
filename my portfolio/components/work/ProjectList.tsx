'use client';

import { useProjectStore } from '@/store/useProjectStore';
import { motion } from 'framer-motion';

const PROJECTS = [
  { id: 1, title: 'Pulse Analytics', client: 'Internal', category: 'Data Vis' },
  { id: 2, title: 'Nebula Commerce', client: 'Nebula Inc.', category: 'E-commerce' },
  { id: 3, title: 'Quarry CMS', client: 'Quarry', category: 'Architecture' },
  { id: 4, title: 'Sprint Arcade', client: 'Concept', category: 'WebGL Game' },
];

export function ProjectList() {
  const setActiveProject = useProjectStore((state) => state.setActiveProject);

  return (
    <section className="relative z-10 w-full bg-transparent py-32" id="work">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            // Selected Index
          </span>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
              className="group flex cursor-pointer items-center justify-between border-b border-white/10 py-12 mix-blend-difference"
            >
              <h2 className="font-display text-5xl font-medium tracking-tighter text-neutral-500 transition-colors duration-500 group-hover:text-white md:text-7xl">
                {project.title}
              </h2>
              <div className="flex flex-col items-end gap-2 text-right">
                <span className="font-mono text-sm text-neutral-600 transition-colors duration-500 group-hover:text-neutral-300">
                  {project.category}
                </span>
                <span className="font-sans text-xs uppercase text-neutral-600">
                  {project.client}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}