"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { LogOut, LayoutDashboard, CheckCircle, Clock, Search, RefreshCw, X, Mail, Phone, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface QuoteItem {
  id: string;
  full_name: string;
  company_name: string;
  phone: string;
  email: string;
  estimated_quantity: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteItem | null>(null);

  const loadQuotes = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    const res = await fetch("/api/quotes");
    const result = await res.json();
    if (res.ok && result.success) {
      setQuotes(result.data || []);
    } else if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void loadQuotes();
    }, 0);
    return () => clearTimeout(timeout);
  }, [loadQuotes]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const matchesStatus = filter === "all" || quote.status === filter;
      const haystack = `${quote.full_name} ${quote.company_name} ${quote.email}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [filter, quotes, search]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "nueva": return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium flex items-center gap-1 w-max"><Clock className="w-3 h-3"/> Nueva</span>;
      case "contactado": return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium flex items-center gap-1 w-max"><CheckCircle className="w-3 h-3"/> Contactado</span>;
      case "cerrada": return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium w-max">Cerrada</span>;
      default: return null;
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/quotes/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    await loadQuotes();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row w-full">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-950 text-white flex flex-col h-auto md:min-h-screen">
        <div className="p-6 border-b border-gray-800">
          <Link href="/" className="text-xl font-black tracking-tighter">
            HJB<span className="text-secondary"> Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gray-900 rounded-lg text-secondary">
                <LayoutDashboard className="h-5 w-5" />
                <span className="font-medium">Cotizaciones</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors w-full">
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cotizaciones Recientes</h1>
            <p className="text-gray-500">Gestione las solicitudes de lomo fino recibidas desde la web.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 text-sm">
              <option value="all">Todos</option>
              <option value="nueva">Nueva</option>
              <option value="contactado">Contactado</option>
              <option value="cerrada">Cerrada</option>
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar cotización..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-primary bg-white text-gray-700 placeholder-gray-400"
              />
            </div>
            <button onClick={() => void loadQuotes(true)} className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100 cursor-pointer">
              <RefreshCw className="h-4 w-4" /> Actualizar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                  <th className="p-4 font-medium">Cliente / Empresa</th>
                  <th className="p-4 font-medium">Correo Electrónico</th>
                  <th className="p-4 font-medium">Fecha</th>
                  <th className="p-4 font-medium">Estado</th>
                  <th className="p-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td className="p-4 text-gray-500" colSpan={5}>Cargando cotizaciones...</td></tr>
                ) : filteredQuotes.length === 0 ? (
                  <tr><td className="p-4 text-gray-500" colSpan={5}>No hay cotizaciones para mostrar.</td></tr>
                ) : filteredQuotes.map((quote) => (
                  <tr key={quote.id} onClick={() => setSelectedQuote(quote)} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <td className="p-4 font-medium text-gray-900">{quote.full_name} <span className="text-gray-500 block text-sm">{quote.company_name || "Sin empresa"}</span></td>
                    <td className="p-4 text-gray-600">{quote.email}</td>
                    <td className="p-4 text-gray-500 text-sm">{new Date(quote.created_at).toLocaleDateString("es-CO")}</td>
                    <td className="p-4">{getStatusBadge(quote.status)}</td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <select value={quote.status} onChange={(e) => void updateStatus(quote.id, e.target.value)} className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white text-black cursor-pointer">
                        <option value="nueva">Nueva</option>
                        <option value="contactado">Contactado</option>
                        <option value="cerrada">Cerrada</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gray-950 text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                  Detalles de Cotización
                </span>
                <h3 className="text-xl font-bold font-display">
                  {selectedQuote.company_name || selectedQuote.full_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Cliente</span>
                  <p className="text-sm font-medium text-gray-900">{selectedQuote.full_name}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Empresa</span>
                  <p className="text-sm font-medium text-gray-900">{selectedQuote.company_name || "—"}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Teléfono</span>
                  <div>
                    <a
                      href={`tel:${selectedQuote.phone}`}
                      className="text-sm font-semibold text-[color:var(--color-primary-light)] hover:underline flex items-center gap-1"
                    >
                      <Phone className="h-3 w-3" /> {selectedQuote.phone}
                    </a>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Correo</span>
                  <div>
                    <a
                      href={`mailto:${selectedQuote.email}`}
                      className="text-sm font-semibold text-[color:var(--color-primary-light)] hover:underline flex items-center gap-1"
                    >
                      <Mail className="h-3 w-3" /> {selectedQuote.email}
                    </a>
                  </div>
                </div>
                <div className="space-y-1 col-span-2">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Fecha de Solicitud</span>
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    {new Date(selectedQuote.created_at).toLocaleString("es-CO")}
                  </p>
                </div>
                <div className="space-y-1 col-span-2">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Cantidad Estimada</span>
                  <p className="text-sm font-bold text-gray-900">{selectedQuote.estimated_quantity || "No especificada"}</p>
                </div>
              </div>

              {/* Message */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <span className="text-xs text-gray-500 uppercase font-semibold block mb-2">Mensaje / Requerimientos</span>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedQuote.message || "Sin mensaje adicional."}
                </p>
              </div>

              {/* Actions & Status */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-150">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Estado:</span>
                  <select
                    value={selectedQuote.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      void updateStatus(selectedQuote.id, newStatus);
                      setSelectedQuote({ ...selectedQuote, status: newStatus });
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white text-black font-medium cursor-pointer"
                  >
                    <option value="nueva">Nueva</option>
                    <option value="contactado">Contactado</option>
                    <option value="cerrada">Cerrada</option>
                  </select>
                </div>

                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  {/* WhatsApp contact button */}
                  <a
                    href={`https://wa.me/${selectedQuote.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-lg bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20ba5a] transition-all cursor-pointer"
                  >
                    Contactar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
