package pt.filipe.gestor_al.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pt.filipe.gestor_al.domain.model.Block;

import java.time.LocalDate;
import java.util.List;

public interface BlockRepository extends JpaRepository<Block, Long> {

    @Query("""
        select bl from Block bl
        where bl.propertyId = :propertyId
          and bl.startDate < :newCheckOut
          and bl.endDate > :newCheckIn
    """)
    List<Block> findOverlapping(
            @Param("propertyId") Long propertyId,
            @Param("newCheckIn") LocalDate newCheckIn,
            @Param("newCheckOut") LocalDate newCheckOut
    );

    List<Block> findByPropertyIdOrderByStartDateAsc(Long propertyId);

    boolean existsByPropertyIdAndStartDateLessThanAndEndDateGreaterThan(
            Long propertyId,
            LocalDate endDate,
            LocalDate startDate
    );
}