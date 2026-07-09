"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();
    if (res.ok && result.success) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError(result.error || "No se pudo iniciar sesión");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('/images/WhatsApp_Image_2026-07-09_at_6.34.23_202607091853.jpeg')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <form onSubmit={handleLogin} className="form">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: "16px" }}>
          <Image
            src="/images/subele_la_calidad_a_la_202607031444.jpeg"
            alt="Sube la calidad"
            width={150}
            height={120}
            style={{ borderRadius: "14px", objectFit: "cover", display: "block", margin: "0 auto" }}
          />
        </div>
        <div className="title">
          Bienvenido,
          <br />
          <span>inicia sesión para continuar</span>
        </div>
        <input
          className="input"
          name="email"
          placeholder="Correo electrónico"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          name="password"
          placeholder="Contraseña"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button type="submit" className="button-confirm" disabled={loading}>
          {loading ? "Validando..." : "Vamos →"}
        </button>
      </form>
    </div>
  );
}
