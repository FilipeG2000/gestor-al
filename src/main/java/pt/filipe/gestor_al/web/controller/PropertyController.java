package pt.filipe.gestor_al.web.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import pt.filipe.gestor_al.service.PropertyService;
import pt.filipe.gestor_al.web.dto.PropertyCreateRequest;
import pt.filipe.gestor_al.web.dto.PropertyResponse;
import pt.filipe.gestor_al.web.dto.PropertyUpdateRequest;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService service;

    public PropertyController(PropertyService service) {
        this.service = service;
    }

    @PostMapping
    public PropertyResponse create(@Valid @RequestBody PropertyCreateRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<PropertyResponse> list() {
        return service.listAll();
    }

    @GetMapping("/{id}")
    public PropertyResponse get(@PathVariable Long id) {
        return service.get(id);
    }

    @PutMapping("/{id}")
    public PropertyResponse update(@PathVariable Long id, @Valid @RequestBody PropertyUpdateRequest req) {
        return service.update(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
