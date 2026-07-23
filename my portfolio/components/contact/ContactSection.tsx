'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect || !glowRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(circle 600px at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 80%)`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      id="contact"
      className="relative min-h-screen w-full items-center justify-center overflow-hidden bg-matte-bg py-32 flex"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-30 mix-blend-screen"
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-neutral-500">
              // 03_Initialize_Uplink
            </span>
            <h2 className="font-display text-5xl font-medium tracking-tight text-white md:text-7xl">
              Let's build <br />
              <span className="text-neutral-500">the impossible.</span>
            </h2>
            <p className="mt-6 max-w-md font-sans text-lg text-neutral-400">
              I am currently accepting select freelance opportunities for Q4. If your project requires an obsessive attention to detail and performance, we should talk.
            </p>

            <div className="mt-12 flex gap-6">
              {['GitHub', 'Twitter', 'LinkedIn'].map((social) => (
                
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  className="font-mono text-sm tracking-widest text-neutral-500 transition-colors hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-xl md:p-12">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="group relative">
                  <input
                    type="text"
                    id="name"
                    required
                    className="peer w-full border-b border-white/10 bg-transparent py-4 font-sans text-white outline-none transition-colors focus:border-white/50"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-4 cursor-text font-mono text-sm text-neutral-500 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white"
                  >
                    IDENTIFIER [NAME]
                  </label>
                </div>

                <div className="group relative mt-4">
                  <input
                    type="email"
                    id="email"
                    required
                    className="peer w-full border-b border-white/10 bg-transparent py-4 font-sans text-white outline-none transition-colors focus:border-white/50"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-4 cursor-text font-mono text-sm text-neutral-500 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white"
                  >
                    COMM_LINK [EMAIL]
                  </label>
                </div>

                <div className="group relative mt-4">
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="peer w-full resize-none border-b border-white/10 bg-transparent py-4 font-sans text-white outline-none transition-colors focus:border-white/50"
                    placeholder=" "
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-4 cursor-text font-mono text-sm text-neutral-500 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white"
                  >
                    PAYLOAD [MESSAGE]
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={cn(
                    "mt-8 flex w-full items-center justify-center gap-3 rounded-full py-4 font-mono text-sm font-medium uppercase tracking-widest transition-all duration-300",
                    isSuccess
                      ? "bg-white/10 text-white"
                      : "bg-white text-black hover:bg-neutral-200 disabled:opacity-50"
                  )}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 rounded-full border-2 border-black border-t-transparent"
                    />
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" /> Transmission Sent
                    </>
                  ) : (
                    <>
                      Transmit Data <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}