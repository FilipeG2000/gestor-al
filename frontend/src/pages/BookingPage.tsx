import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type {
    BookingCreateRequest,
    BookingResponse,
    PropertyResponse,
} from "../types";

export default function BookingPage() {
    const [properties, setProperties] = useState<PropertyResponse[]>([]);
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | "">("");
    const [bookings, setBookings] = useState<BookingResponse[]>([]);
    const [loadingProperties, setLoadingProperties] = useState(false);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<BookingCreateRequest>({
        propertyId: 0,
        guestName: "",
        guestsCount: 2,
        checkIn: "2026-03-01",
        checkOut: "2026-03-05",
    });

    useEffect(() => {
        void loadProperties();
    }, []);

    useEffect(() => {
        if (selectedPropertyId === "") {
            setBookings([]);
            return;
        }

        setForm((prev) => ({
            ...prev,
            propertyId: Number(selectedPropertyId),
        }));

        void loadBookings(Number(selectedPropertyId));
    }, [selectedPropertyId]);

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

    async function loadBookings(propertyId: number) {
        setLoadingBookings(true);
        setError(null);

        try {
            const data = await api.getBookingsByProperty(propertyId);
            setBookings(data);
        } catch (e: any) {
            setError(formatApiError(e));
        } finally {
            setLoadingBookings(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (selectedPropertyId === "") return;

        setSubmitting(true);
        setError(null);

        try {
            await api.createBooking({
                propertyId: Number(selectedPropertyId),
                guestName: form.guestName,
                guestsCount: Number(form.guestsCount),
                checkIn: form.checkIn,
                checkOut: form.checkOut,
            });

            setForm((prev) => ({
                ...prev,
                guestName: "",
                guestsCount: 2,
                checkIn: "2026-03-01",
                checkOut: "2026-03-05",
            }));

            await loadBookings(Number(selectedPropertyId));
        } catch (e: any) {
            setError(formatApiError(e));
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div>
            <h2>Bookings</h2>

            {error && (
                <div style={errorBoxStyle}>
                    <strong>Erro:</strong> {error}
                </div>
            )}

            <div style={{ marginBottom: 16 }}>
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

            {loadingProperties && <p>A carregar propriedades...</p>}

            <section style={cardStyle}>
                <h3>Criar booking</h3>

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                            <label>Guest name</label>
                            <input
                                style={inputStyle}
                                value={form.guestName}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, guestName: e.target.value }))
                                }
                            />
                        </div>

                        <div>
                            <label>Guests</label>
                            <input
                                style={inputStyle}
                                type="number"
                                min={1}
                                value={form.guestsCount}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        guestsCount: Number(e.target.value),
                                    }))
                                }
                            />
                        </div>

                        <div>
                            <label>Check-in (YYYY-MM-DD)</label>
                            <input
                                style={inputStyle}
                                value={form.checkIn}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, checkIn: e.target.value }))
                                }
                            />
                        </div>

                        <div>
                            <label>Check-out (YYYY-MM-DD)</label>
                            <input
                                style={inputStyle}
                                value={form.checkOut}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, checkOut: e.target.value }))
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={selectedPropertyId === "" || submitting}
                        >
                            {submitting ? "A criar..." : "Criar booking"}
                        </button>
                    </div>
                </form>
            </section>

            <section style={{ marginTop: 24 }}>
                <h3>Bookings da property</h3>

                {selectedPropertyId === "" ? (
                    <p>Seleciona uma propriedade.</p>
                ) : loadingBookings ? (
                    <p>A carregar bookings...</p>
                ) : bookings.length === 0 ? (
                    <p>Sem bookings para esta propriedade.</p>
                ) : (
                    <div style={{ display: "grid", gap: 12 }}>
                        {bookings.map((booking) => (
                            <div key={booking.id} style={cardStyle}>
                                <p><strong>ID:</strong> {booking.id}</p>
                                <p><strong>Guest:</strong> {booking.guestName}</p>
                                <p><strong>Guests:</strong> {booking.guestsCount}</p>
                                <p><strong>Check-in:</strong> {booking.checkIn}</p>
                                <p><strong>Check-out:</strong> {booking.checkOut}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
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