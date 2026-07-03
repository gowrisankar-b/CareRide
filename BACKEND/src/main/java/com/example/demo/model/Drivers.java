package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "drivers")
@Data
public class Drivers {
    @Id
    private String driverId;

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
