package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection="users")
@Data
public class Users {
    @Id
    private String id;

    private String username;

    private String password;

    private String name;

    private String age;

    private String gender;

    private String email;

    private String phoneNumber;

    private String address;

    private String emergencyContact;

    private String medicalConditions;

    private String wheelchairNeeded;

}
