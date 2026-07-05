package com.example.demo.repository;

import com.example.demo.model.CareTakers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareTakerRepo extends JpaRepository<CareTakers, Long> {
    CareTakers findByUsernameAndPassword(String username, String password);
}
