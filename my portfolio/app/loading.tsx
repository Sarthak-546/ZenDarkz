'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-matte-bg">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ scaleX: [0, 1, 0], originX: [0, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-[1px] w-32 bg-white/40"
        />
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Compiling Assets...
        </span>
      </div>
    </div>
  );
}