package com.example.demo.model;

import com.example.demo.repository.UserRepo;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "booking")
@Data
public class Bookings {
    @Id
    private String bookingId;

    private Users user;
    private String username;
    private String password;
    private CareTakers caretaker=null;
    private Drivers driver=null;
    private String pickupLocation;
    private String dropLocation;
    private String vehicleType;
    private String status=null;
    private double fare=0.0;
    private String caretakerRequired;
    private String wheelChairRequired;
    private boolean driverCompleted;
    private boolean caretakerCompleted;

    public Bookings(String username,String password,String pickupLocation,String dropLocation,String vehicleType,String caretakerRequired,String wheelChairRequired){
        this.username=username;
        this.password=password;
        this.pickupLocation=pickupLocation;
        this.dropLocation = dropLocation;
        this.vehicleType=vehicleType;
        this.caretakerRequired=caretakerRequired;
        this.wheelChairRequired=wheelChairRequired;
    }

}
