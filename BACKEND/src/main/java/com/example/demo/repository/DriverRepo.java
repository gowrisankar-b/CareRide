package com.example.demo.repository;

import com.example.demo.model.Drivers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepo extends JpaRepository<Drivers, Long> {
    Drivers findByUsernameAndPassword(String username, String password);
}
