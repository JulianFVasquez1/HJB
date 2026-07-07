import Link from "next/link";
import { ArrowRight, Target, Eye, Gem, Users, Award } from "lucide-react";

export const metadata = {
  title: "Nosotros",
  description:
    "Conozca la historia y el compromiso de HJB (Héctor Julio Báez Fuentes) con la calidad del lomo fino premium.",
};

export default function NosotrosPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ─── Page Header ─── */}
      <section className="relative bg-[#1A1A1A] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[color:var(--color-primary)] via-[color:var(--color-surface-dark)] to-[color:var(--color-surface-dark)]" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-secondary/10 blur-[100px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3 block">
            Sobre Nosotros
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
            Nuestra Historia
          </h1>
          <p className="text-xl text-[color:var(--color-cream)]/80 max-w-2xl mx-auto">
            Tradición, calidad y compromiso en cada corte.
          </p>
          <div className="section-divider mx-auto mt-8" />
        </div>
      </section>
      {/* ─── Story ─── */}
      <section className="py-24 bg-surface-dark relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left: Visual */}
            <div className="relative">
              <div className="aspect-[4/5] bg-[color:var(--color-surface)] rounded-2xl overflow-hidden relative border border-neutral-800">
                <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-primary)]/30 to-[color:var(--color-surface-dark)]/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="font-display text-7xl font-black text-white mb-4 opacity-80">
                      HJB
                    </div>
                    <div className="text-secondary text-sm uppercase tracking-[0.3em] font-semibold">
                      Premium 
                    </div>
                    <div className="section-divider mx-auto mt-4" />
                    <p className="text-[color:var(--color-cream)]/80 text-sm mt-4 italic">
                     sogamoso, Colombia
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-secondary/15 border border-secondary/20 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display text-3xl font-black text-secondary">
                    +40
                  </div>
                  <p className="text-[color:var(--color-cream)]/75 text-xs font-medium">Años</p>
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                El legado de{" "}
                <span className="text-secondary">
                  Héctor Julio Báez Fuentes
                </span>
              </h2>
              <p className="text-[color:var(--color-cream)]/80 leading-relaxed mb-6 text-lg">
                HJB nace de la pasión por ofrecer los mejores cortes de carne al
                mercado mayorista. Con más de 15 años de experiencia en el sector
                cárnico, hemos perfeccionado nuestro proceso de selección, corte
                y empaque para garantizar un estándar de calidad insuperable.
              </p>
              <p className="text-[color:var(--color-cream)]/80 leading-relaxed text-lg">
                Nuestro compromiso es ser el aliado estratégico de restaurantes,
                hoteles y negocios de alta cocina que exigen lomo fino de primer
                nivel para satisfacer a sus clientes más exigentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission / Vision ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface p-10 rounded-2xl border border-neutral-800 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Nuestra Misión
              </h3>
              <p className="text-[color:var(--color-cream)]/80 leading-relaxed">
                Proveer cortes de lomo fino empacados al vacío de la más alta
                calidad, cumpliendo con estrictos estándares sanitarios y
                garantizando la cadena de frío, para potenciar el éxito
                gastronómico de nuestros clientes.
              </p>
            </div>

            <div className="bg-surface p-10 rounded-2xl border border-neutral-800 hover:shadow-lg transition-shadow">
              <div className="bg-secondary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Nuestra Visión
              </h3>
              <p className="text-[color:var(--color-cream)]/80 leading-relaxed">
                Ser reconocidos como el proveedor líder de lomo fino premium en
                Colombia, estableciendo nuevos estándares de calidad, confianza
                y servicio en el mercado cárnico mayorista.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="py-24 bg-surface-dark">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3 block">
              Lo que nos define
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Nuestros Valores
            </h2>
            <div className="section-divider mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Gem,
                title: "Excelencia",
                desc: "Cada corte pasa por un riguroso control de calidad antes de ser empacado y entregado.",
              },
              {
                icon: Users,
                title: "Compromiso",
                desc: "Nos comprometemos con cada cliente, entendiendo sus necesidades y superando sus expectativas.",
              },
              {
                icon: Award,
                title: "Integridad",
                desc: "Operamos con transparencia total en cada etapa del proceso, desde la selección hasta la entrega.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-surface p-8 rounded-2xl border border-neutral-800 text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <value.icon className="h-7 w-7 text-secondary" />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-[color:var(--color-cream)]/70 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-background border-t border-neutral-800">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-display text-3xl font-bold text-white mb-4">
            ¿Busca un proveedor confiable?
          </h3>
          <p className="text-[color:var(--color-cream)]/70 mb-8 max-w-lg mx-auto">
            Converse con nuestro equipo y descubra cómo podemos ser su aliado
            estratégico en cortes premium.
          </p>
          <Link
            href="/contacto"
            className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 text-base font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] shadow-lg shadow-primary/20"
          >
            Contáctenos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
