'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Preloader } from '@/components/animations/Preloader';
import { HeroSection } from '@/components/hero/HeroSection';

const ProjectList = dynamic(() => import('@/components/work/ProjectList').then((mod) => mod.ProjectList), { ssr: false });
const ProjectCanvas = dynamic(() => import('@/components/work/ProjectCanvas').then((mod) => mod.ProjectCanvas), { ssr: false });
const AboutSection = dynamic(() => import('@/components/about/AboutSection').then((mod) => mod.AboutSection), { ssr: true });
const SkillsSection = dynamic(() => import('@/components/skills/SkillsSection').then((mod) => mod.SkillsSection), { ssr: true });
const ContactSection = dynamic(() => import('@/components/contact/ContactSection').then((mod) => mod.ContactSection), { ssr: true });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const handlePreloaderComplete = useCallback(() => setIsLoaded(true), []);

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={isLoaded ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0 h-screen overflow-hidden'}>
        <HeroSection />
        <div className="relative">
          <ProjectCanvas />
          <ProjectList />
        </div>
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </div>
    </>
  );
}