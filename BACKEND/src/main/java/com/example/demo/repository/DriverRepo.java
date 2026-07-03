package com.example.demo.repository;

import com.example.demo.model.Drivers;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepo extends MongoRepository<Drivers,String> {
    Drivers findByUsernameAndPassword(String username, String password);
}
