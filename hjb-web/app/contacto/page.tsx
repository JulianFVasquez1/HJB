"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      companyName: String(formData.get("companyName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      estimatedQuantity: String(formData.get("estimatedQuantity") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      honeypot: String(formData.get("honeypot") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSuccess(true);
        setMessage("Tu solicitud fue enviada correctamente. Te contactaremos pronto.");
        (e.target as HTMLFormElement).reset();
      } else {
        setError(true);
        setMessage(result.error || "Ocurrió un error al enviar la solicitud.");
      }
    } catch {
      setError(true);
      setMessage("No se pudo completar el envío. Inténtelo nuevamente.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full bg-surface-dark">
      <section className="relative bg-background py-20 border-b border-neutral-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-background to-background" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3 block">
            Contacto Directo
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Solicitar Cotización</h1>
          <p className="text-xl text-[color:var(--color-cream)]/80 max-w-2xl mx-auto">
            Déjenos sus datos y nuestro equipo comercial se comunicará a la brevedad.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface-dark">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Información de Contacto */}
            <div className="w-full lg:w-1/3">
              <h2 className="font-display text-2xl font-bold text-white mb-6">Información de Contacto</h2>
              <p className="text-[color:var(--color-cream)]/70 mb-8">
                Estamos listos para atender sus pedidos al por mayor y resolver cualquier duda sobre nuestro producto.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-neutral-800">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Teléfono / WhatsApp</h4>
                    <a href="tel:+573102965339" className="text-[color:var(--color-cream)]/70 mt-1 hover:text-[color:var(--color-secondary)] transition-colors block">+57 310 296 5339</a>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-neutral-800">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Email</h4>
                    <a href="mailto:hjuliobaez@hotmail.com" className="text-[color:var(--color-cream)]/70 mt-1 hover:text-[color:var(--color-secondary)] transition-colors block">hjuliobaez@hotmail.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-neutral-800">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Ubicación</h4>
                    <p className="text-[color:var(--color-cream)]/70 mt-1">Cra. 11 #21-56 Sur, Barrio Venecia, sogamoso</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Formulario */}
            <div className="w-full lg:w-2/3">
              <div className="bg-surface p-8 md:p-10 rounded-2xl border border-neutral-800 shadow-xl">
                <h3 className="font-display text-2xl font-bold text-white mb-8">Envíenos un Mensaje</h3>
                
                {success && (
                  <div className="p-4 mb-8 bg-green-950/40 text-green-200 rounded-lg border border-green-900/50">
                    {message}
                  </div>
                )}
                
                {error && (
                  <div className="p-4 mb-8 bg-red-950/40 text-red-200 rounded-lg border border-red-900/50">
                    {message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium text-[color:var(--color-cream)]/80">Nombre Completo *</label>
                      <input required type="text" id="fullName" name="fullName" className="w-full h-12 px-4 rounded-md border border-neutral-800 bg-neutral-950 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="text-sm font-medium text-[color:var(--color-cream)]/80">Empresa / Negocio</label>
                      <input type="text" id="companyName" name="companyName" className="w-full h-12 px-4 rounded-md border border-neutral-800 bg-neutral-950 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-[color:var(--color-cream)]/80">Correo Electrónico *</label>
                      <input required type="email" id="email" name="email" className="w-full h-12 px-4 rounded-md border border-neutral-800 bg-neutral-950 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-[color:var(--color-cream)]/80">Número de Teléfono *</label>
                      <input required type="tel" id="phone" name="phone" className="w-full h-12 px-4 rounded-md border border-neutral-800 bg-neutral-950 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="estimatedQuantity" className="text-sm font-medium text-[color:var(--color-cream)]/80">Cantidad estimada</label>
                    <input type="text" id="estimatedQuantity" name="estimatedQuantity" placeholder="Ej. 50 kg/mes" className="w-full h-12 px-4 rounded-md border border-neutral-800 bg-neutral-950 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-[color:var(--color-cream)]/80">Mensaje / Detalles del Pedido</label>
                    <textarea id="message" name="message" rows={5} className="w-full p-4 rounded-md border border-neutral-800 bg-neutral-950 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"></textarea>
                  </div>

                  <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
                  
                  <button 
                    disabled={loading}
                    type="submit" 
                    className="flex w-full items-center justify-center h-12 rounded-sm bg-primary px-8 text-base font-semibold text-white transition-all hover:bg-primary-dark hover:scale-[1.01] shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Enviando..." : (
                      <>
                        Enviar Solicitud <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
