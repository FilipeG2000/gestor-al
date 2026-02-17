package pt.filipe.gestor_al.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pt.filipe.gestor_al.domain.model.Property;

public interface PropertyRepository extends JpaRepository<Property, Long> {}
