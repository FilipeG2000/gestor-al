import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { AvailabilityResponse, PropertyResponse } from "../types";

export default function AvailabilityPage() {
    const [properties, setProperties] = useState<PropertyResponse[]>([]);
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | "">("");
    const [from, setFrom] = useState("2026-03-01");
    const [to, setTo] = useState("2026-03-05");
    const [result, setResult] = useState<AvailabilityResponse | null>(null);
    const [loadingProperties, setLoadingProperties] = useState(false);
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        void loadProperties();
    }, []);

    async function loadProperties() {
        setLoadingProperties(true);
        setError(null);

        try {
            const data = await api.getProperties();
            setProperties(data);

            if (data.length > 0) {
                setSelectedPropertyId(data[0].id);
            }
        } catch (e: any) {
            setError(formatApiError(e));
        } finally {
            setLoadingProperties(false);
        }
    }

    async function handleCheck(e: React.FormEvent) {
        e.preventDefault();

        if (selectedPropertyId === "") return;

        setChecking(true);
        setError(null);
        setResult(null);

        try {
            const response = await api.checkAvailability(
                Number(selectedPropertyId),
                from,
                to
            );
            setResult(response);
        } catch (e: any) {
            setError(formatApiError(e));
        } finally {
            setChecking(false);
        }
    }

    return (
        <div>
            <h2>Availability</h2>

            {error && (
                <div style={errorBoxStyle}>
                    <strong>Erro:</strong> {error}
                </div>
            )}

            {loadingProperties ? (
                <p>A carregar propriedades...</p>
            ) : (
                <form onSubmit={handleCheck} style={cardStyle}>
                    <div style={{ marginBottom: 12 }}>
                        <label>
                            Property:{" "}
                            <select
                                value={selectedPropertyId}
                                onChange={(e) =>
                                    setSelectedPropertyId(
                                        e.target.value === "" ? "" : Number(e.target.value)
                                    )
                                }
                            >
                                <option value="">Seleciona uma propriedade</option>
                                {properties.map((property) => (
                                    <option key={property.id} value={property.id}>
                                        {property.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                            <label>From</label>
                            <input
                                style={inputStyle}
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>To</label>
                            <input
                                style={inputStyle}
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <button type="submit" disabled={selectedPropertyId === "" || checking}>
                            {checking ? "A verificar..." : "Verificar disponibilidade"}
                        </button>
                    </div>
                </form>
            )}

            {result && (
                <div style={{ ...cardStyle, marginTop: 16 }}>
                    <p><strong>Property ID:</strong> {result.propertyId}</p>
                    <p><strong>From:</strong> {result.from}</p>
                    <p><strong>To:</strong> {result.to}</p>
                    <p><strong>Available:</strong> {result.available ? "Sim" : "Não"}</p>
                    <p><strong>Reason:</strong> {result.reason}</p>
                </div>
            )}
        </div>
    );
}

const cardStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: 12,
    padding: 16,
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    marginTop: 4,
    boxSizing: "border-box",
};

const errorBoxStyle: React.CSSProperties = {
    marginTop: 12,
    marginBottom: 12,
    padding: 12,
    border: "1px solid #f3c2c2",
    background: "#fff5f5",
    borderRadius: 8,
    whiteSpace: "pre-wrap",
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