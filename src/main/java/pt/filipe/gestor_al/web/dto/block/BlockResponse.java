package pt.filipe.gestor_al.web.dto.block;

import java.time.Instant;
import java.time.LocalDate;

public class BlockResponse {
    public Long id;
    public Long propertyId;
    public String reason;
    public LocalDate startDate;
    public LocalDate endDate;
    public Instant createdAt;
}