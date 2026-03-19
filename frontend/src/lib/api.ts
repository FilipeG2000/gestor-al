import type { PropertyCreateRequest, PropertyResponse } from "../types";

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
            } catch {
                // ignore
            }
        } else {
            try {
                details = await res.text();
            } catch {
                // ignore
            }
        }

        const err: ApiError = {
            message: `API error ${res.status} (${res.statusText})`,
            status: res.status,
            details,
        };

        throw err;
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
};