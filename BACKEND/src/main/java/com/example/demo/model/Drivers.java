package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "drivers")
@Data
public class Drivers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long driverId;

    private String username;

    private String password;

    private String name;

    private int age;

    private String gender;

    private String email;

    private String phoneNumber;

    private String address;

    private String vehicleType; // Car/Bike/Auto

    private String vehicleNumber;

    private String licenseNumber;

    private String availability;

    private String status; // Active / Inactive
}
