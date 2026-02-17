package pt.filipe.gestor_al.web.dto;

import java.time.Instant;

public class PropertyResponse {
    public Long id;
    public String name;
    public String timezone;
    public String checkInTime;
    public String checkOutTime;
    public Instant createdAt;
}
