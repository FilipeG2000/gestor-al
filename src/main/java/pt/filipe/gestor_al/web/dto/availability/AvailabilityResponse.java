package pt.filipe.gestor_al.web.dto.availability;

import java.time.LocalDate;

public class AvailabilityResponse {
    public Long propertyId;
    public LocalDate from;
    public LocalDate to;
    public boolean available;
    public String reason; // opcional p/ UI (ex: BOOKING_CONFLICT / BLOCK_CONFLICT / INVALID_RANGE)
}