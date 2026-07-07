"use client";

import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[color:var(--color-surface-dark)] overflow-hidden font-sans relative">
      <section className="relative w-full min-h-screen bg-[color:var(--color-surface-dark)] flex items-start overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/fondo.jpeg" 
            alt="HJB Lomo Fino de Res empacado al vacío" 
            fill
            className="object-cover"
            style={{ objectPosition: 'center right' }}
            priority
            quality={90}
          />
          {/* Subtle gradient to ensure text readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>

        {/* Text Overlay Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 w-full py-32">
          <div className="max-w-xl text-center md:text-left">
            
            <h3 className="text-[color:var(--color-secondary)] tracking-[0.3em] text-sm md:text-sm font-semibold mb-6 uppercase">
              Premium
            </h3>
            
            <h1 className="font-display text-7xl md:text-8xl text-white font-bold leading-none mb-2 tracking-wide drop-shadow-lg">
              LOMO FINO
            </h1>
            
            <h2 className="font-display text-6xl md:text-7xl text-[color:var(--color-primary-light)] italic font-semibold mb-6 drop-shadow-lg">
              DE RES
            </h2>
            
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <div className="h-[2px] w-8 md:w-16 bg-[color:var(--color-secondary)]/50"></div>
              <p className="text-[color:var(--color-cream)] text-base md:text-xl tracking-[0.2em] font-light uppercase">
                Empacado al vacío
              </p>
              <div className="h-[2px] w-8 md:w-16 bg-[color:var(--color-secondary)]/50"></div>
            </div>

            {/* Features Row */}
            <div className="flex items-start justify-center md:justify-start gap-1 md:gap-2 w-full max-w-md mx-auto md:mx-0 mb-8">
              
              {/* Feature 1 */}
              <div className="flex flex-col items-center gap-2 group w-24 md:w-28">
                <div className="w-14 h-14 rounded-lg border-2 border-[color:var(--color-secondary)]/40 flex items-center justify-center p-2.5 transition-colors group-hover:border-[color:var(--color-secondary)] bg-[color:var(--color-surface)]/20 backdrop-blur-sm">
                  {/* Cow Icon */}
                  <Image src="/cow-icon.png" alt="Res seleccionada" width={28} height={28} className="w-7 h-7 object-contain" />
                </div>
                <span className="text-[color:var(--color-cream)] text-[0.6rem] md:text-[0.7rem] text-center uppercase tracking-widest leading-relaxed font-semibold">
                  100% Res<br/>Seleccionada
                </span>
              </div>

              {/* Separator */}
              <div className="w-px h-14 bg-[color:var(--color-secondary)]/30 mt-2"></div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center gap-2 group w-24 md:w-28">
                <div className="w-14 h-14 rounded-lg border-2 border-[color:var(--color-secondary)]/40 flex items-center justify-center p-2.5 transition-colors group-hover:border-[color:var(--color-secondary)] bg-[color:var(--color-surface)]/20 backdrop-blur-sm">
                  {/* Cleaver Icon */}
                  <Image src="/cleaver-icon.png" alt="Corte Premium" width={28} height={28} className="w-7 h-7 object-contain" />
                </div>
                <span className="text-[color:var(--color-cream)] text-[0.6rem] md:text-[0.7rem] text-center uppercase tracking-widest leading-relaxed font-semibold">
                  Corte<br/>Premium
                </span>
              </div>

              {/* Separator */}
              <div className="w-px h-14 bg-[color:var(--color-secondary)]/30 mt-2"></div>


              {/* Feature 3 */}
              <div className="flex flex-col items-center gap-2 group w-24 md:w-28">
                <div className="w-14 h-14 rounded-lg border-2 border-[color:var(--color-secondary)]/40 flex items-center justify-center p-2.5 transition-colors group-hover:border-[color:var(--color-secondary)] bg-[color:var(--color-surface)]/20 backdrop-blur-sm">
                  {/* Snowflake Icon */}
                  <svg className="w-7 h-7 text-[color:var(--color-secondary)]" viewBox="-50 -50 100 100" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <g id="snowflake-branch">
                        <line x1="0" y1="0" x2="0" y2="-40" />
                        <line x1="0" y1="-28" x2="-12" y2="-40" />
                        <line x1="0" y1="-28" x2="12" y2="-40" />
                        <line x1="0" y1="-16" x2="-12" y2="-28" />
                        <line x1="0" y1="-16" x2="12" y2="-28" />
                      </g>
                    </defs>
                    <use href="#snowflake-branch" />
                    <use href="#snowflake-branch" transform="rotate(60)" />
                    <use href="#snowflake-branch" transform="rotate(120)" />
                    <use href="#snowflake-branch" transform="rotate(180)" />
                    <use href="#snowflake-branch" transform="rotate(240)" />
                    <use href="#snowflake-branch" transform="rotate(300)" />
                  </svg>
                </div>
                <span className="text-[color:var(--color-cream)] text-[0.6rem] md:text-[0.7rem] text-center uppercase tracking-widest leading-relaxed font-semibold">
                  Mantener<br/>Refrigerado
                </span>
              </div>

            </div>
          </div>
        </div>
        
      

      </section>

      {/* Hero Text Strip */}
      <section className="w-full bg-black">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[color:var(--color-secondary)]/80 uppercase tracking-[0.35em] text-xs md:text-sm mb-3">
              Lomo fino al vacío
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold text-[color:var(--color-cream)] leading-tight mb-3">
              Cortes premium seleccionados para conservar sabor, frescura y textura.
            </h3>
            <p className="text-[color:var(--color-cream)] text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              Cada pieza se empaca al vacío para que llegues a tu mesa con la máxima calidad y con la confianza de un proceso profesional de selección, corte y almacenamiento.
            </p>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="w-full h-[600px] bg-[color:var(--color-surface-dark)]">
        <Carousel items={[
          { image: "/images/carousel-1.jpeg", title: "Certificaciones" },
          { image: "/images/carousel-2.jpeg", title: "Procesos Premium" },
          { image: "/images/carousel-3.jpeg", title: "Control de Calidad" },
        ]} />
      </section>
    </div>
  );
}
