import { useEffect, useState } from "react";
import { api } from "../lib/api";
import type { BookingCreateRequest, BookingResponse, PropertyResponse } from "../types";

export default function BookingPage() {
    const [properties, setProperties] = useState<PropertyResponse[]>([]);
    const [propertyId, setPropertyId] = useState<number | null>(null);

    const [bookings, setBookings] = useState<BookingResponse[]>([]);
    const [err, setErr] = useState<string | null>(null);

    const [form, setForm] = useState<Omit<BookingCreateRequest, "propertyId">>({
        guestName: "",
        guestsCount: 2,
        checkIn: "",
        checkOut: "",
    });

    async function loadProperties() {
        const res = await api.get<PropertyResponse[]>("/api/properties");
        setProperties(res.data);
        if (res.data.length && propertyId == null) setPropertyId(res.data[0].id);
    }

    async function loadBookings(pid: number) {
        const res = await api.get<BookingResponse[]>("/api/bookings", { params: { propertyId: pid } });
        setBookings(res.data);
    }

    async function createBooking() {
        if (!propertyId) return;
        setErr(null);
        try {
            await api.post("/api/bookings", { propertyId, ...form });
            setForm({ guestName: "", guestsCount: 2, checkIn: "", checkOut: "" });
            await loadBookings(propertyId);
        } catch (e: any) {
            setErr(e?.response?.data?.message ?? e?.message ?? "Erro ao criar booking");
        }
    }

    useEffect(() => {
        loadProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (propertyId) loadBookings(propertyId);
    }, [propertyId]);

    return (
        <div>
            <h2>Bookings</h2>

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

            <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8, marginTop: 12 }}>
                <h3>Criar booking</h3>

                <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr" }}>
                    <label>
                        Guest name
                        <input
                            value={form.guestName}
                            onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                            style={{ width: "100%" }}
                        />
                    </label>

                    <label>
                        Guests
                        <input
                            type="number"
                            min={1}
                            value={form.guestsCount}
                            onChange={(e) => setForm({ ...form, guestsCount: Number(e.target.value) })}
                            style={{ width: "100%" }}
                        />
                    </label>

                    <label>
                        Check-in (YYYY-MM-DD)
                        <input
                            value={form.checkIn}
                            onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                            placeholder="2026-03-01"
                            style={{ width: "100%" }}
                        />
                    </label>

                    <label>
                        Check-out (YYYY-MM-DD)
                        <input
                            value={form.checkOut}
                            onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                            placeholder="2026-03-05"
                            style={{ width: "100%" }}
                        />
                    </label>
                </div>

                <button onClick={createBooking} disabled={!propertyId || !form.guestName || !form.checkIn || !form.checkOut} style={{ marginTop: 12 }}>
                    Criar booking
                </button>

                {err && <p style={{ color: "crimson" }}>{err}</p>}
            </div>

            <h3 style={{ marginTop: 16 }}>Bookings da property</h3>
            <ul>
                {bookings.map((b) => (
                    <li key={b.id}>
                        #{b.id} — {b.guestName} ({b.guestsCount}) — {b.checkIn} → {b.checkOut} — {b.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}