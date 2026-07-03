package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "caretakers")
@Data
public class CareTakers {
    @Id
    private String caretakerId;

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
