import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[color:var(--color-surface-dark)] text-[color:var(--color-cream)] pt-16 pb-8 border-t border-[color:var(--color-secondary)]/40">
      <div className="container mx-auto px-4">
        {/* Top CTA strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 mb-12 border-b border-[color:var(--color-secondary)]/60">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              ¿Listo para cotizar?
            </h3>
            <p className="text-[color:var(--color-cream)]/80">
              Contáctenos hoy y reciba precios preferenciales por volumen.
            </p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[color:var(--color-secondary)] text-[color:var(--color-surface-dark)] font-bold text-sm hover:bg-[color:var(--color-secondary-light)] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[color:var(--color-secondary)]/20 shrink-0"
          >
            Solicitar Cotización
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <div className="font-display text-2xl font-black tracking-tight text-[color:var(--color-cream)]">
                HJB<span className="text-[color:var(--color-secondary)]">Premium</span>
              </div>
            </Link>
            <p className="text-[color:var(--color-cream)] text-sm max-w-xs leading-relaxed mb-6">
              Especialistas en la venta al por mayor de lomo fino de res
              empacado al vacío. Calidad premium garantizada para su negocio.
            </p>
            <p className="text-sm text-[color:var(--color-secondary)] italic">
              &ldquo;Calidad que se ve, sabor que se siente.&rdquo;
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">
              Enlaces
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/nosotros", label: "Nuestra Historia" },
                { href: "/producto", label: "Lomo Fino Premium" },
                { href: "/invima", label: "Certificación INVIMA" },
                { href: "/contacto", label: "Solicitar Cotización" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[color:var(--color-cream)] hover:text-[color:var(--color-secondary)] transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-5">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-secondary)]/10 rounded-lg shrink-0 mt-0.5">
                  <Phone className="h-4 w-4 text-[color:var(--color-secondary)]" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Teléfono</p>
                  <a
                    href="tel:+573102965339"
                    className="text-[color:var(--color-cream)] text-sm hover:text-[color:var(--color-secondary)] transition-colors"
                  >
                    +57 310 296 5339
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-secondary)]/10 rounded-lg shrink-0 mt-0.5">
                  <Mail className="h-4 w-4 text-[color:var(--color-secondary)]" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Email</p>
                  <a
                    href="mailto:hjuliobaez@hotmail.com"
                    className="text-[color:var(--color-cream)] text-sm hover:text-[color:var(--color-secondary)] transition-colors"
                  >
                    hjuliobaez@hotmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 bg-[color:var(--color-secondary)]/10 rounded-lg shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-[color:var(--color-secondary)]" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Ubicación</p>
                  <span className="text-[color:var(--color-cream)] text-sm">
                    Cra. 11 #21-56 Sur, Barrio Venecia, sogamoso
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[color:var(--color-secondary)]/40 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[color:var(--color-cream)]/70">
          <p>
            © {new Date().getFullYear()} HJB Premium. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-6">
          </div>
        </div>
      </div>
    </footer>
  );
}
