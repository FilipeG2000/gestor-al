package pt.filipe.gestor_al.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PropertyUpdateRequest {

    @NotBlank
    @Size(max = 120)
    public String name;

    @Size(max = 64)
    public String timezone;

    @Size(max = 5)
    public String checkInTime;

    @Size(max = 5)
    public String checkOutTime;
}
