package pt.filipe.gestor_al.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pt.filipe.gestor_al.domain.model.Booking;
import pt.filipe.gestor_al.domain.model.BookingStatus;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("""
        select b from Booking b
        where b.propertyId = :propertyId
          and b.status = :status
          and b.checkIn < :newCheckOut
          and b.checkOut > :newCheckIn
    """)
    List<Booking> findOverlapping(
            @Param("propertyId") Long propertyId,
            @Param("status") BookingStatus status,
            @Param("newCheckIn") LocalDate newCheckIn,
            @Param("newCheckOut") LocalDate newCheckOut
    );

    List<Booking> findByPropertyIdOrderByCheckInAsc(Long propertyId);
}