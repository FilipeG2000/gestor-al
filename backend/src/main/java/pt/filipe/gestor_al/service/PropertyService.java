package pt.filipe.gestor_al.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pt.filipe.gestor_al.domain.model.Property;
import pt.filipe.gestor_al.repository.PropertyRepository;
import pt.filipe.gestor_al.web.dto.PropertyCreateRequest;
import pt.filipe.gestor_al.web.dto.PropertyResponse;
import pt.filipe.gestor_al.web.dto.PropertyUpdateRequest;

import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository repo;

    public PropertyService(PropertyRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public PropertyResponse create(PropertyCreateRequest req) {
        Property p = new Property();
        p.setName(req.name);
        p.setTimezone(req.timezone);
        p.setCheckInTime(req.checkInTime);
        p.setCheckOutTime(req.checkOutTime);

        p = repo.save(p);
        return toResponse(p);
    }

    @Transactional(readOnly = true)
    public List<PropertyResponse> listAll() {
        return repo.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public PropertyResponse get(Long id) {
        Property p = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Property not found: " + id));
        return toResponse(p);
    }

    @Transactional
    public PropertyResponse update(Long id, PropertyUpdateRequest req) {
        Property p = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Property not found: " + id));

        p.setName(req.name);
        if (req.timezone != null) p.setTimezone(req.timezone);
        if (req.checkInTime != null) p.setCheckInTime(req.checkInTime);
        if (req.checkOutTime != null) p.setCheckOutTime(req.checkOutTime);

        return toResponse(p);
    }

    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Property not found: " + id);
        }
        repo.deleteById(id);
    }

    private PropertyResponse toResponse(Property p) {
        PropertyResponse r = new PropertyResponse();
        r.id = p.getId();
        r.name = p.getName();
        r.timezone = p.getTimezone();
        r.checkInTime = p.getCheckInTime();
        r.checkOutTime = p.getCheckOutTime();
        r.createdAt = p.getCreatedAt();
        return r;
    }
}
