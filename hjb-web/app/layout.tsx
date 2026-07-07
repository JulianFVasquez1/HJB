import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import RouteAwareLayout from "@/components/layout/RouteAwareLayout";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hjblomofino.com"),
  title: {
    default: "HJB Premium — Lomo Fino al Vacío ",
    template: "%s | HJB Premium",
  },
  description:
    "Venta al por mayor de lomo fino de res empacado al vacío. Calidad premium certificada por INVIMA. Héctor Julio Báez Fuentes.",
  keywords: [
    "lomo fino",
    "carne al vacío",
    "venta mayorista carne",
    "lomo fino premium",
    "HJB",
    "Bogotá",
    "Colombia",
    "INVIMA",
  ],
  openGraph: {
    title: "HJB Premium — Lomo Fino al Vacío",
    description:
      "Venta al por mayor de lomo fino de res empacado al vacío. Calidad premium certificada por INVIMA.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <RouteAwareLayout>{children}</RouteAwareLayout>
      </body>
    </html>
  );
}
