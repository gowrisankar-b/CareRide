package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "bookings")
@Data
public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    // Stored for lookup convenience; not a FK column
    private String username;
    private String password;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "caretaker_id")
    private CareTakers caretaker;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Drivers driver;

    private String pickupLocation;

    private String dropLocation;

    private String vehicleType;

    private String status;

    private double fare = 0.0;

    private String caretakerRequired;

    private String wheelChairRequired;

    private boolean driverCompleted;

    private boolean caretakerCompleted;

    public Bookings() {}

    public Bookings(String username, String password, String pickupLocation,
                    String dropLocation, String vehicleType,
                    String caretakerRequired, String wheelChairRequired) {
        this.username = username;
        this.password = password;
        this.pickupLocation = pickupLocation;
        this.dropLocation = dropLocation;
        this.vehicleType = vehicleType;
        this.caretakerRequired = caretakerRequired;
        this.wheelChairRequired = wheelChairRequired;
    }
}
