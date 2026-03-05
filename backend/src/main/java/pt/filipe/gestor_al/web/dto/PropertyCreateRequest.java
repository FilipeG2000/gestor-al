package pt.filipe.gestor_al.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PropertyCreateRequest {

    @NotBlank
    @Size(max = 120)
    public String name;

    @Size(max = 64)
    public String timezone = "Europe/Lisbon";

    @Size(max = 5)
    public String checkInTime = "15:00";

    @Size(max = 5)
    public String checkOutTime = "11:00";
}
