package pt.filipe.gestor_al.web.dto.block;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class BlockCreateRequest {
    @NotNull
    public Long propertyId;

    public String reason;

    @NotNull
    public LocalDate startDate;

    @NotNull
    public LocalDate endDate;
}