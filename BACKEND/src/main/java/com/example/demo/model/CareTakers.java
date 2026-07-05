package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "caretakers")
@Data
public class CareTakers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long caretakerId;

    private String name;

    private String username;

    private String password;

    private int age;

    private String gender;

    private String email;

    private String phoneNumber;

    private String address;

    private String languagesSpoken;

    private String availability;

    private String status; // Active / Inactive
}
