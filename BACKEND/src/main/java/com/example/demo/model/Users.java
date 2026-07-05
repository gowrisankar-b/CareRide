package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
