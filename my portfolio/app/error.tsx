'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  useEffect(() => { console.error('Application Error:', error); }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-matte-bg px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 flex flex-col items-center">
        <span className="mb-6 font-mono text-xs uppercase tracking-widest text-neutral-500">// System_Fault</span>
        <h2 className="font-display text-4xl font-medium tracking-tight text-white md:text-6xl">An anomaly occurred.</h2>
        <button onClick={() => reset()} className="mt-12 rounded-full bg-white px-8 py-4 text-sm font-medium text-black">Reboot Sequence</button>
      </motion.div>
    </div>
  );
}