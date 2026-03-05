package pt.filipe.gestor_al.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.filipe.gestor_al.domain.model.BookingStatus;
import pt.filipe.gestor_al.domain.model.Block;
import pt.filipe.gestor_al.repository.BlockRepository;
import pt.filipe.gestor_al.repository.BookingRepository;
import pt.filipe.gestor_al.web.dto.block.BlockCreateRequest;
import pt.filipe.gestor_al.web.dto.block.BlockResponse;

import java.util.List;

@Service
public class BlockService {

    private final BlockRepository blockRepo;
    private final BookingRepository bookingRepo;

    public BlockService(BlockRepository blockRepo, BookingRepository bookingRepo) {
        this.blockRepo = blockRepo;
        this.bookingRepo = bookingRepo;
    }

    @Transactional
    public BlockResponse create(BlockCreateRequest req) {
        if (!req.startDate.isBefore(req.endDate)) {
            throw new IllegalArgumentException("startDate must be before endDate");
        }

        // bloqueio não pode cair em cima de reservas confirmadas
        var overlappingBookings = bookingRepo.findOverlapping(
                req.propertyId, BookingStatus.CONFIRMED, req.startDate, req.endDate
        );
        if (!overlappingBookings.isEmpty()) {
            throw new IllegalArgumentException("Block overlaps an existing booking");
        }

        Block bl = new Block();
        bl.setPropertyId(req.propertyId);
        bl.setReason(req.reason);
        bl.setStartDate(req.startDate);
        bl.setEndDate(req.endDate);

        bl = blockRepo.save(bl);
        return toResponse(bl);
    }

    @Transactional(readOnly = true)
    public List<BlockResponse> listByProperty(Long propertyId) {
        return blockRepo.findByPropertyIdOrderByStartDateAsc(propertyId)
                .stream().map(this::toResponse).toList();
    }

    private BlockResponse toResponse(Block b) {
        BlockResponse r = new BlockResponse();
        r.id = b.getId();
        r.propertyId = b.getPropertyId();
        r.reason = b.getReason();
        r.startDate = b.getStartDate();
        r.endDate = b.getEndDate();
        r.createdAt = b.getCreatedAt();
        return r;
    }
}