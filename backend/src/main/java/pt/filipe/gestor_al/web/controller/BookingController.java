package pt.filipe.gestor_al.web.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import pt.filipe.gestor_al.service.BookingService;
import pt.filipe.gestor_al.web.dto.booking.BookingCreateRequest;
import pt.filipe.gestor_al.web.dto.booking.BookingResponse;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @PostMapping
    public BookingResponse create(@Valid @RequestBody BookingCreateRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<BookingResponse> listByProperty(@RequestParam Long propertyId) {
        return service.listByProperty(propertyId);
    }
}