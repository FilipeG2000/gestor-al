package pt.filipe.gestor_al.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.filipe.gestor_al.domain.model.BookingStatus;
import pt.filipe.gestor_al.repository.BlockRepository;
import pt.filipe.gestor_al.repository.BookingRepository;
import pt.filipe.gestor_al.web.dto.availability.AvailabilityResponse;

import java.time.LocalDate;

@Service
public class AvailabilityService {

    private final BookingRepository bookingRepo;
    private final BlockRepository blockRepo;

    public AvailabilityService(BookingRepository bookingRepo, BlockRepository blockRepo) {
        this.bookingRepo = bookingRepo;
        this.blockRepo = blockRepo;
    }

    @Transactional(readOnly = true)
    public AvailabilityResponse check(Long propertyId, LocalDate from, LocalDate to) {
        AvailabilityResponse res = new AvailabilityResponse();
        res.propertyId = propertyId;
        res.from = from;
        res.to = to;

        // validação básica
        if (from == null || to == null || !from.isBefore(to)) {
            res.available = false;
            res.reason = "INVALID_RANGE";
            return res;
        }

        boolean bookingConflict =
                bookingRepo.existsByPropertyIdAndStatusAndCheckInLessThanAndCheckOutGreaterThan(
                        propertyId, BookingStatus.CONFIRMED, to, from
                );

        if (bookingConflict) {
            res.available = false;
            res.reason = "BOOKING_CONFLICT";
            return res;
        }

        boolean blockConflict =
                blockRepo.existsByPropertyIdAndStartDateLessThanAndEndDateGreaterThan(
                        propertyId, to, from
                );

        if (blockConflict) {
            res.available = false;
            res.reason = "BLOCK_CONFLICT";
            return res;
        }

        res.available = true;
        res.reason = "AVAILABLE";
        return res;
    }
}