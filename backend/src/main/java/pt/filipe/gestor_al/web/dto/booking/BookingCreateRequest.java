package pt.filipe.gestor_al.web.dto.booking;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class BookingCreateRequest {
    @NotNull
    public Long propertyId;

    @NotBlank
    public String guestName;

    @Min(1)
    public int guestsCount;

    @NotNull
    public LocalDate checkIn;

    @NotNull
    public LocalDate checkOut;
}