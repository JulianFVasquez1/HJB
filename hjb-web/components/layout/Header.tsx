"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "INICIO" },
  { href: "/producto", label: "PRODUCTOS" },
  { href: "/nosotros", label: "NOSOTROS" },
  { href: "/invima", label: "CALIDAD" },
  { href: "/contacto", label: "CONTACTO" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMobileOpen(false);
    }, 0);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500 h-[100px] flex items-center",
          scrolled || isAdminPage
            ? "glass-dark border-b border-white/5 bg-[#0f172a]/95"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <div className="font-display text-4xl md:text-5xl font-black tracking-widest text-[color:var(--color-primary)] transition-transform group-hover:scale-[1.02] leading-none">
              H<span className="text-[color:var(--color-primary-light)] -ml-2">J</span><span className="text-[color:var(--color-primary)] -ml-2">B</span>
            </div>
            <div className="text-[0.55rem] md:text-[0.65rem] font-sans tracking-[0.3em] text-[color:var(--color-secondary)] mt-1">
              Héctor Julio Báez Fuentes 
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[0.75rem] font-semibold transition-colors uppercase tracking-[0.15em]",
                  pathname === link.href
                    ? "text-white"
                    : isAdminPage
                    ? "text-gray-300 hover:text-gray-100"
                    : "text-[color:var(--color-cream)]/70 hover:text-[color:var(--color-secondary)]"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span 
                    layoutId="underline"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[color:var(--color-secondary)] rounded-full" 
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/admin/login"
              className={cn(
                "text-sm font-semibold transition-colors",
                isAdminPage
                  ? "text-gray-200 hover:text-white"
                  : "text-[color:var(--color-cream)]/80 hover:text-[color:var(--color-secondary)]"
              )}
            >
              Acceso privado
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[color:var(--color-cream)] hover:text-[color:var(--color-secondary)] transition-colors"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Nav Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 w-80 max-w-[85vw] h-full bg-[color:var(--color-surface-dark)] border-l border-[color:var(--color-cream)]/10 shadow-2xl transition-transform duration-500 ease-in-out md:hidden flex flex-col",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex flex-col items-center">
             <div className="font-display text-3xl font-black tracking-widest text-[color:var(--color-primary)] leading-none">
                H<span className="text-[color:var(--color-primary-light)] -ml-1">J</span><span className="text-[color:var(--color-primary)] -ml-1">B</span>
             </div>
             <div className="text-[0.5rem] font-sans tracking-[0.3em] text-[color:var(--color-secondary)] mt-1">
                PREMIUM
             </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-[color:var(--color-cream)]/70 hover:text-[color:var(--color-secondary)] rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center px-4 py-4 rounded-xl text-sm font-semibold transition-all uppercase tracking-[0.1em]",
                pathname === link.href
                  ? "bg-[color:var(--color-primary)]/10 text-[color:var(--color-secondary)]"
                  : "text-[color:var(--color-cream)]/70 hover:bg-[color:var(--color-secondary)]/10 hover:text-[color:var(--color-secondary)]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-white/5">
            <Link
              href="/admin/login"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center px-4 py-4 rounded-xl text-sm font-semibold transition-all uppercase tracking-[0.1em]",
                pathname === "/admin/login"
                  ? "bg-[color:var(--color-primary)]/10 text-[color:var(--color-secondary)]"
                  : "text-[color:var(--color-cream)]/50 hover:bg-[color:var(--color-secondary)]/10 hover:text-[color:var(--color-secondary)]"
              )}
            >
              Acceso privado
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
