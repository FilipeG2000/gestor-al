package pt.filipe.gestor_al.web.controller;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import pt.filipe.gestor_al.service.BlockService;
import pt.filipe.gestor_al.web.dto.block.BlockCreateRequest;
import pt.filipe.gestor_al.web.dto.block.BlockResponse;

import java.util.List;

@RestController
@RequestMapping("/api/blocks")
public class BlockController {

    private final BlockService service;

    public BlockController(BlockService service) {
        this.service = service;
    }

    @PostMapping
    public BlockResponse create(@Valid @RequestBody BlockCreateRequest req) {
        return service.create(req);
    }

    @GetMapping
    public List<BlockResponse> listByProperty(@RequestParam Long propertyId) {
        return service.listByProperty(propertyId);
    }
}