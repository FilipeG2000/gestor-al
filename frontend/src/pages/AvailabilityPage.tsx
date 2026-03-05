import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { AvailabilityResponse, PropertyResponse } from "../types";

export default function AvailabilityPage() {
    const [properties, setProperties] = useState<PropertyResponse[]>([]);
    const [propertyId, setPropertyId] = useState<number | null>(null);

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const [result, setResult] = useState<AvailabilityResponse | null>(null);
    const [err, setErr] = useState<string | null>(null);

    async function loadProperties() {
        const res = await api.get<PropertyResponse[]>("/api/properties");
        setProperties(res.data);
        if (res.data.length && propertyId == null) setPropertyId(res.data[0].id);
    }

    async function check() {
        if (!propertyId) return;
        setErr(null);
        setResult(null);
        try {
            const res = await api.get<AvailabilityResponse>("/api/availability", {
                params: { propertyId, from, to },
            });
            setResult(res.data);
        } catch (e: any) {
            setErr(e?.response?.data?.message ?? e?.message ?? "Erro ao verificar disponibilidade");
        }
    }

    useEffect(() => {
        loadProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h2>Availability</h2>

            <label>
                Property:
                <select
                    value={propertyId ?? ""}
                    onChange={(e) => setPropertyId(Number(e.target.value))}
                    style={{ marginLeft: 8 }}
                >
                    {properties.map((p) => (
                        <option key={p.id} value={p.id}>
                            #{p.id} — {p.name}
                        </option>
                    ))}
                </select>
            </label>

            <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr", marginTop: 12, maxWidth: 600 }}>
                <label>
                    From
                    <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="2026-03-01" />
                </label>
                <label>
                    To
                    <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="2026-03-05" />
                </label>
            </div>

            <button onClick={check} disabled={!propertyId || !from || !to} style={{ marginTop: 12 }}>
                Verificar
            </button>

            {err && <p style={{ color: "crimson" }}>{err}</p>}

            {result && (
                <div style={{ marginTop: 12, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
                    <p>
                        <b>Available:</b> {String(result.available)}
                    </p>
                    <p>
                        <b>Reason:</b> {result.reason}
                    </p>
                </div>
            )}
        </div>
    );
}