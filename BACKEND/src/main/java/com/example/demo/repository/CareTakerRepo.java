package com.example.demo.repository;

import com.example.demo.model.CareTakers;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareTakerRepo extends MongoRepository<CareTakers,String> {
    CareTakers findByUsernameAndPassword(String username, String password);
}
