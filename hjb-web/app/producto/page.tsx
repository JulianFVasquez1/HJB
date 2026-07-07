import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Package,
  Thermometer,
  Timer,
  Scale,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "El Producto",
  description:
    "Conozca las especificaciones de nuestro lomo fino premium empacado al vacío. Corte magro, maduración controlada, empaque termoformado.",
};

const specs = [
  { icon: CheckCircle2, text: "Corte magro y de alta terneza" },
  { icon: Timer, text: "Maduración óptima controlada" },
  { icon: Scale, text: "Limpieza profesional (sin cordón)" },
  { icon: Package, text: "Empaque al vacío termoformado" },
  { icon: Thermometer, text: "Cadena de frío garantizada" },
  { icon: CheckCircle2, text: "Etiquetado normativo completo" },
];

export default function ProductoPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ─── Page Header ─── */}
      <section className="relative bg-[#1A1A1A] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-secondary via-surface-dark to-surface-dark" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3 block">
            Nuestro Producto
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-4">
            Lomo Fino Premium
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            El corte más tierno y valorado, procesado con los más altos
            estándares.
          </p>
          <div className="section-divider mx-auto mt-8" />
        </div>
      </section>

      {/* ─── Product Showcase ─── */}
      <section className="py-24 bg-surface-dark">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 group">
                <Image
                  src="/product-beef.png"
                  alt="Lomo fino de res premium - corte de alta calidad"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
                {/* Overlay badge */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/90 backdrop-blur-sm text-white text-sm font-semibold shadow-lg">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    Premium
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="w-full lg:w-1/2">
              <span className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3 block">
                Especificaciones
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Especificaciones del Corte
              </h2>
              <p className="text-[color:var(--color-cream)]/80 leading-relaxed mb-8 text-lg">
                Nuestro lomo fino (tenderloin) es cuidadosamente seleccionado de
                novillos para asegurar la máxima terneza. El proceso de empaque
                al vacío sella la frescura, previene la contaminación cruzada y
                permite una maduración natural en su propio jugo.
              </p>

              <ul className="space-y-4 mb-10">
                {specs.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="bg-secondary/10 p-1.5 rounded-lg shrink-0 mt-0.5 group-hover:bg-secondary/20 transition-colors">
                      <spec.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <span className="text-[color:var(--color-cream)]/90 font-medium">
                      {spec.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contacto"
                className="inline-flex h-14 w-full lg:w-auto items-center justify-center rounded-full bg-primary px-10 text-base font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.02] shadow-lg shadow-primary/20"
              >
                Solicitar Lista de Precios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Process Steps ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3 block">
              Nuestro proceso
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              De la selección a su mesa
            </h2>
            <div className="section-divider mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Selección",
                desc: "Elegimos los mejores novillos para garantizar la terneza óptima.",
              },
              {
                step: "02",
                title: "Corte",
                desc: "Procesamiento profesional con limpieza total y estandarización de peso.",
              },
              {
                step: "03",
                title: "Empaque",
                desc: "Empaque al vacío termoformado que sella la frescura y previene oxidación.",
              },
              {
                step: "04",
                title: "Entrega",
                desc: "Distribución con cadena de frío controlada hasta su punto de recepción.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative text-center group"
              >
                <div className="font-display text-5xl font-black text-secondary/70 mb-4 group-hover:text-secondary transition-colors">
                  {item.step}
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-[color:var(--color-cream)]/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-surface-dark relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-surface-dark to-surface-dark" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-6">
            ¿Interesado en nuestro producto?
          </h2>
          <p className="text-[color:var(--color-cream)]/70 mb-8 max-w-lg mx-auto text-lg">
            Envíenos sus datos y recibirá nuestra lista de precios por volumen a
            la brevedad.
          </p>
          <Link
            href="/contacto"
            className="inline-flex h-14 items-center justify-center rounded-full bg-secondary px-10 text-lg font-bold text-gray-950 transition-all hover:bg-secondary-light hover:scale-[1.02] shadow-lg shadow-secondary/20"
          >
            Cotizar Ahora
            <ArrowRight className="ml-3 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
