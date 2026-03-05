package pt.filipe.gestor_al.web.dto.booking;

import pt.filipe.gestor_al.domain.model.BookingStatus;

import java.time.Instant;
import java.time.LocalDate;

public class BookingResponse {
    public Long id;
    public Long propertyId;
    public String guestName;
    public int guestsCount;
    public LocalDate checkIn;
    public LocalDate checkOut;
    public BookingStatus status;
    public Instant createdAt;
}