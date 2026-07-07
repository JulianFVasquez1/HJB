import { ShieldCheck, FileCheck } from "lucide-react";

export const metadata = {
  title: "Certificación INVIMA | HJB - Lomo Fino",
  description: "Información sobre nuestras certificaciones y estándares de calidad sanitaria (INVIMA).",
};

export default function InvimaPage() {
  return (
    <div className="flex flex-col w-full bg-surface-dark">
      <section className="relative bg-background py-20 border-b border-neutral-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-background to-background" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3 block">
            Calidad y Estándares
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Certificación Sanitaria</h1>
          <p className="text-xl text-[color:var(--color-cream)]/80 max-w-2xl mx-auto">
            Comprometidos con la inocuidad y seguridad alimentaria.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface-dark">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center p-6 bg-primary/10 rounded-full mb-8">
            <ShieldCheck className="h-24 w-24 text-secondary" />
          </div>
          
          <h2 className="font-display text-3xl font-bold text-white mb-6">Regulación INVIMA</h2>
          <p className="text-[color:var(--color-cream)]/80 leading-relaxed text-lg mb-12 max-w-2xl mx-auto">
            HJB opera bajo el estricto cumplimiento de las normativas establecidas por 
            el Instituto Nacional de Vigilancia de Medicamentos y Alimentos (INVIMA). 
            Nuestras plantas de procesamiento y métodos de empaque garantizan un producto 
            inocuo y de excelente calidad.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
             <div className="p-8 border border-neutral-800 rounded-2xl bg-surface">
                <FileCheck className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-display text-xl font-bold text-white mb-3">Trazabilidad Total</h3>
                <p className="text-[color:var(--color-cream)]/70">
                  Mantenemos un registro riguroso de cada lote de producción, permitiendo 
                  rastrear el origen y proceso del producto de principio a fin.
                </p>
             </div>
             
             <div className="p-8 border border-neutral-800 rounded-2xl bg-surface">
                <FileCheck className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-display text-xl font-bold text-white mb-3">Cadena de Frío</h3>
                <p className="text-[color:var(--color-cream)]/70">
                  Controlamos exhaustivamente la temperatura durante todo el proceso, desde el 
                  corte hasta la entrega, asegurando que el producto se mantenga en condiciones óptimas.
                </p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
