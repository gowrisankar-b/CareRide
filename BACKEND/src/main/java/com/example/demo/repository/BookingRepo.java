package com.example.demo.repository;

import com.example.demo.model.Bookings;
import com.example.demo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Bookings, Long> {
    List<Bookings> findByUser(Users user);

    List<Bookings> findByCaretakerUsername(String username);

    List<Bookings> findByDriverUsername(String username);
}
