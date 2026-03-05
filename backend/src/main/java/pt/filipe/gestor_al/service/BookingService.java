package pt.filipe.gestor_al.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.filipe.gestor_al.domain.model.Booking;
import pt.filipe.gestor_al.domain.model.BookingStatus;
import pt.filipe.gestor_al.repository.BlockRepository;
import pt.filipe.gestor_al.repository.BookingRepository;
import pt.filipe.gestor_al.web.dto.booking.BookingCreateRequest;
import pt.filipe.gestor_al.web.dto.booking.BookingResponse;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepo;
    private final BlockRepository blockRepo;

    public BookingService(BookingRepository bookingRepo, BlockRepository blockRepo) {
        this.bookingRepo = bookingRepo;
        this.blockRepo = blockRepo;
    }

    @Transactional
    public BookingResponse create(BookingCreateRequest req) {
        if (!req.checkIn.isBefore(req.checkOut)) {
            throw new IllegalArgumentException("checkIn must be before checkOut");
        }

        // 1) conflito com reservas existentes (CONFIRMED)
        var overlappingBookings = bookingRepo.findOverlapping(
                req.propertyId, BookingStatus.CONFIRMED, req.checkIn, req.checkOut
        );
        if (!overlappingBookings.isEmpty()) {
            throw new IllegalArgumentException("Booking overlaps an existing booking");
        }

        // 2) conflito com bloqueios
        var overlappingBlocks = blockRepo.findOverlapping(req.propertyId, req.checkIn, req.checkOut);
        if (!overlappingBlocks.isEmpty()) {
            throw new IllegalArgumentException("Booking overlaps a blocked period");
        }

        Booking b = new Booking();
        b.setPropertyId(req.propertyId);
        b.setGuestName(req.guestName);
        b.setGuestsCount(req.guestsCount);
        b.setCheckIn(req.checkIn);
        b.setCheckOut(req.checkOut);
        b.setStatus(BookingStatus.CONFIRMED);

        b = bookingRepo.save(b);
        return toResponse(b);
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> listByProperty(Long propertyId) {
        return bookingRepo.findByPropertyIdOrderByCheckInAsc(propertyId)
                .stream().map(this::toResponse).toList();
    }

    private BookingResponse toResponse(Booking b) {
        BookingResponse r = new BookingResponse();
        r.id = b.getId();
        r.propertyId = b.getPropertyId();
        r.guestName = b.getGuestName();
        r.guestsCount = b.getGuestsCount();
        r.checkIn = b.getCheckIn();
        r.checkOut = b.getCheckOut();
        r.status = b.getStatus();
        r.createdAt = b.getCreatedAt();
        return r;
    }
}