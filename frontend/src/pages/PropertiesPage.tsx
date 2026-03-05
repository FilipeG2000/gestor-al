import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { PropertyCreateRequest, PropertyResponse } from "../types";

export default function PropertiesPage() {
  const [items, setItems] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState<PropertyCreateRequest>({
    name: "",
    timezone: "Europe/Lisbon",
    checkInTime: "15:00",
    checkOutTime: "11:00",
  });

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const res = await api.get<PropertyResponse[]>("/api/properties");
      setItems(res.data);
    } catch (e: any) {
      setErr(e?.message ?? "Erro ao carregar properties");
    } finally {
      setLoading(false);
    }
  }

  async function create() {
    setErr(null);
    try {
      await api.post("/api/properties", form);
      setForm((f) => ({ ...f, name: "" }));
      await load();
    } catch (e: any) {
      setErr(e?.response?.data?.message ?? e?.message ?? "Erro ao criar");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Properties</h2>

      <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8, marginBottom: 16 }}>
        <h3>Criar property</h3>
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr" }}>
          <label>
            Nome
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%" }}
              placeholder="Ex: AL Centro Porto"
            />
          </label>

          <label>
            Timezone
            <input
              value={form.timezone ?? ""}
              onChange={(e) => setForm({ ...form, timezone: e.target.value })}
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Check-in
            <input
              value={form.checkInTime ?? ""}
              onChange={(e) => setForm({ ...form, checkInTime: e.target.value })}
              style={{ width: "100%" }}
              placeholder="15:00"
            />
          </label>

          <label>
            Check-out
            <input
              value={form.checkOutTime ?? ""}
              onChange={(e) => setForm({ ...form, checkOutTime: e.target.value })}
              style={{ width: "100%" }}
              placeholder="11:00"
            />
          </label>
        </div>

        <button onClick={create} disabled={!form.name.trim()} style={{ marginTop: 12 }}>
          Criar
        </button>

        {err && <p style={{ color: "crimson" }}>{err}</p>}
      </div>

      <button onClick={load} disabled={loading}>
        {loading ? "A carregar..." : "Recarregar"}
      </button>

      <table style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">ID</th>
            <th align="left">Nome</th>
            <th align="left">Timezone</th>
            <th align="left">Check-in</th>
            <th align="left">Check-out</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.timezone}</td>
              <td>{p.checkInTime}</td>
              <td>{p.checkOutTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}