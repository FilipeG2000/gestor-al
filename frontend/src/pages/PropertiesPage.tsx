import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import type { PropertyCreateRequest, PropertyResponse } from "../types";

const DEFAULT_TIMEZONE = "Europe/Lisbon";
const DEFAULT_CHECKIN = "15:00";
const DEFAULT_CHECKOUT = "11:00";

export default function PropertiesPage() {
  const [items, setItems] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<PropertyCreateRequest>({
    name: "",
    timezone: DEFAULT_TIMEZONE,
    checkInTime: DEFAULT_CHECKIN,
    checkOutTime: DEFAULT_CHECKOUT,
  });

  const canSubmit = useMemo(() => {
    return (
        form.name.trim().length >= 2 &&
        (form.timezone?.trim().length ?? 0) > 0 &&
        /^\d{2}:\d{2}$/.test(form.checkInTime ?? "") &&
        /^\d{2}:\d{2}$/.test(form.checkOutTime ?? "")
    );
  }, [form]);

  async function loadProperties() {
    setLoading(true);
    setError(null);

    try {
      const data = await api.getProperties();
      setItems(data);
    } catch (e: any) {
      setError(formatApiError(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProperties();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      const created = await api.createProperty({
        name: form.name.trim(),
        timezone: form.timezone?.trim(),
        checkInTime: form.checkInTime,
        checkOutTime: form.checkOutTime,
      });

      setItems((prev) => [created, ...prev]);

      setForm({
        name: "",
        timezone: DEFAULT_TIMEZONE,
        checkInTime: DEFAULT_CHECKIN,
        checkOutTime: DEFAULT_CHECKOUT,
      });
    } catch (e: any) {
      setError(formatApiError(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
        <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h1 style={{ margin: 0 }}>Propriedades</h1>

          <button
              onClick={loadProperties}
              disabled={loading}
              style={{ marginLeft: "auto" }}
          >
            {loading ? "A carregar..." : "Refresh"}
          </button>
        </header>

        {error && (
            <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  border: "1px solid #f3c2c2",
                  background: "#fff5f5",
                  borderRadius: 8,
                  whiteSpace: "pre-wrap",
                }}
            >
              <strong>Erro:</strong> {error}
            </div>
        )}

        <section
            style={{
              marginTop: 16,
              padding: 16,
              border: "1px solid #ddd",
              borderRadius: 12,
            }}
        >
          <h2 style={{ marginTop: 0 }}>Criar nova propriedade</h2>

          <form
              onSubmit={handleSubmit}
              style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}
          >
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ display: "block", fontWeight: 600 }}>Nome</label>
              <input
                  value={form.name}
                  onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Ex: Casa da Praia"
                  style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 600 }}>Timezone</label>
              <input
                  value={form.timezone ?? ""}
                  onChange={(e) =>
                      setForm((prev) => ({ ...prev, timezone: e.target.value }))
                  }
                  placeholder="Europe/Lisbon"
                  style={inputStyle}
              />
            </div>

            <div />

            <div>
              <label style={{ display: "block", fontWeight: 600 }}>
                Check-in
              </label>
              <input
                  value={form.checkInTime ?? ""}
                  onChange={(e) =>
                      setForm((prev) => ({ ...prev, checkInTime: e.target.value }))
                  }
                  placeholder="15:00"
                  style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 600 }}>
                Check-out
              </label>
              <input
                  value={form.checkOutTime ?? ""}
                  onChange={(e) =>
                      setForm((prev) => ({ ...prev, checkOutTime: e.target.value }))
                  }
                  placeholder="11:00"
                  style={inputStyle}
              />
            </div>

            <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12 }}>
              <button type="submit" disabled={!canSubmit || submitting}>
                {submitting ? "A criar..." : "Criar"}
              </button>

              <button
                  type="button"
                  onClick={() =>
                      setForm({
                        name: "",
                        timezone: DEFAULT_TIMEZONE,
                        checkInTime: DEFAULT_CHECKIN,
                        checkOutTime: DEFAULT_CHECKOUT,
                      })
                  }
                  disabled={submitting}
              >
                Limpar
              </button>
            </div>
          </form>
        </section>

        <section style={{ marginTop: 16 }}>
          <h2>Lista de propriedades</h2>

          {loading && items.length === 0 ? (
              <p>A carregar propriedades...</p>
          ) : items.length === 0 ? (
              <p>Ainda não existem propriedades.</p>
          ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {items.map((property) => (
                    <div
                        key={property.id}
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: 12,
                          padding: 14,
                        }}
                    >
                      <h3 style={{ margin: "0 0 8px 0" }}>{property.name}</h3>
                      <p style={{ margin: 0 }}>
                        <strong>ID:</strong> {property.id}
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Timezone:</strong> {property.timezone}
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Check-in:</strong> {property.checkInTime}
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Check-out:</strong> {property.checkOutTime}
                      </p>
                    </div>
                ))}
              </div>
          )}
        </section>
      </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ccc",
  borderRadius: 8,
  marginTop: 4,
  boxSizing: "border-box",
};

function formatApiError(error: any): string {
  if (!error) return "Erro desconhecido.";

  if (typeof error === "string") return error;

  if (error.details) {
    try {
      return `${error.message}\n${JSON.stringify(error.details, null, 2)}`;
    } catch {
      return error.message ?? "Erro na API.";
    }
  }

  return error.message ?? "Erro na API.";
}