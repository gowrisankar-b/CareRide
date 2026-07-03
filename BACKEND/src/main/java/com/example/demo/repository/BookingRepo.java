package com.example.demo.repository;

import com.example.demo.model.Bookings;
import com.example.demo.model.CareTakers;
import com.example.demo.model.Drivers;
import com.example.demo.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends MongoRepository<Bookings,String> {
    List<Bookings> findByUser(Users user);

    List<Bookings> findByCaretakerUsername(String username);

    List<Bookings> findByDriverUsername(String username);
}
