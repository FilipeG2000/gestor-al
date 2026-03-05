export type PropertyResponse = {
    id: number;
    name: string;
    timezone: string;
    checkInTime: string;
    checkOutTime: string;
    createdAt: string;
};

export type PropertyCreateRequest = {
    name: string;
    timezone?: string;
    checkInTime?: string;
    checkOutTime?: string;
};

export type BookingCreateRequest = {
    propertyId: number;
    guestName: string;
    guestsCount: number;
    checkIn: string;  // YYYY-MM-DD
    checkOut: string; // YYYY-MM-DD
};

export type BookingResponse = {
    id: number;
    propertyId: number;
    guestName: string;
    guestsCount: number;
    checkIn: string;
    checkOut: string;
    status: "CONFIRMED" | "CANCELLED";
    createdAt: string;
};

export type AvailabilityResponse = {
    propertyId: number;
    from: string;
    to: string;
    available: boolean;
    reason: "AVAILABLE" | "BOOKING_CONFLICT" | "BLOCK_CONFLICT" | "INVALID_RANGE";
};