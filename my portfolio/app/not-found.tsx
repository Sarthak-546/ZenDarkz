'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-matte-bg px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 flex flex-col items-center">
        <span className="mb-6 font-mono text-xs uppercase tracking-widest text-neutral-500">// Error_404</span>
        <h1 className="font-display text-6xl font-medium tracking-tight text-white md:text-8xl">Void Sector.</h1>
        <Link href="/" className="mt-12 rounded-full bg-white px-8 py-4 text-sm font-medium text-black">Return to Origin</Link>
      </motion.div>
    </div>
  );
}
