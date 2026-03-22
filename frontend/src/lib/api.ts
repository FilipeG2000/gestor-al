import type {
    BookingCreateRequest,
    BookingResponse,
    PropertyCreateRequest,
    PropertyResponse,
    AvailabilityResponse,
} from "../types";

const API_BASE_URL = "http://localhost:8080/api";

type ApiError = {
    message: string;
    status: number;
    details?: unknown;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers ?? {}),
        },
        ...options,
    });

    const contentType = res.headers.get("content-type") ?? "";
    const hasJson = contentType.includes("application/json");

    if (!res.ok) {
        let details: unknown = undefined;

        if (hasJson) {
            try {
                details = await res.json();
            } catch {}
        } else {
            try {
                details = await res.text();
            } catch {}
        }

        throw {
            message: `API error ${res.status} (${res.statusText})`,
            status: res.status,
            details,
        } as ApiError;
    }

    if (!hasJson) {
        return undefined as T;
    }

    return await res.json();
}

export const api = {
    getProperties: () => request<PropertyResponse[]>("/properties"),

    createProperty: (payload: PropertyCreateRequest) =>
        request<PropertyResponse>("/properties", {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    updateProperty: (id: number, payload: PropertyCreateRequest) =>
        request<PropertyResponse>(`/properties/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
        }),

    deleteProperty: (id: number) =>
        request<void>(`/properties/${id}`, {
            method: "DELETE",
        }),

    getBookingsByProperty: (propertyId: number) =>
        request<BookingResponse[]>(`/bookings?propertyId=${propertyId}`),

    createBooking: (payload: BookingCreateRequest) =>
        request<BookingResponse>("/bookings", {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    checkAvailability: (propertyId: number, from: string, to: string) =>
        request<AvailabilityResponse>(
            `/availability?propertyId=${propertyId}&from=${from}&to=${to}`
        ),
};