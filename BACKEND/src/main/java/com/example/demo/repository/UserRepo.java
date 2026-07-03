package com.example.demo.repository;

import com.example.demo.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<Users,String> {
    Users findByUsernameAndPassword(String username, String password);
}
