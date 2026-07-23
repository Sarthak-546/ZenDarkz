import { SmoothScroll } from '@/components/providers/SmoothScroll';
import './globals.css';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata = {
  title: 'Alex Rivera | Creative Technologist',
  description: 'Award-winning frontend architect and creative technologist.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable} ${mono.variable}`}>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>
          <main className="relative z-10 flex min-h-screen flex-col">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}