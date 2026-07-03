package com.example.demo.service;

import com.example.demo.model.Bookings;
import com.example.demo.model.CareTakers;
import com.example.demo.model.Drivers;
import com.example.demo.model.Users;
import com.example.demo.repository.BookingRepo;
import com.example.demo.repository.CareTakerRepo;
import com.example.demo.repository.DriverRepo;
import com.example.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
public class AdminService {
    @Autowired
    BookingRepo bookingRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    CareTakerRepo careTakerRepo;

    public List<Users> getAllusers() {
        return userRepo.findAll();
    }

    public List<Drivers> getAllDrivers() {
        return driverRepo.findAll();
    }

    public List<CareTakers> getAllCareTakers() {
        return careTakerRepo.findAll();
    }

    public Bookings bookRide(Bookings bookings) {
        List<Drivers> drivers = driverRepo.findAll();
        List<CareTakers> careTakers = careTakerRepo.findAll();

        boolean caretakerRequired = bookings.getCaretakerRequired().equalsIgnoreCase("yes");

        // If caretaker is required, both driver and caretaker must be available
        if (caretakerRequired) {
            Drivers availableDriver = drivers.stream()
                    .filter(d -> d.getAvailability().equalsIgnoreCase("yes"))
                    .findFirst()
                    .orElse(null);

            CareTakers availableCaretaker = careTakers.stream()
                    .filter(c -> c.getAvailability().equalsIgnoreCase("yes"))
                    .findFirst()
                    .orElse(null);

            if (availableDriver != null && availableCaretaker != null) {
                bookings.setDriver(availableDriver);
                bookings.setCaretaker(availableCaretaker);
                availableDriver.setAvailability("no");
                availableCaretaker.setAvailability("no");
                bookings.setFare(calculateFare());
                bookings.setStatus("success");

                driverRepo.save(availableDriver);
                careTakerRepo.save(availableCaretaker);
                bookingRepo.save(bookings);

                return bookings;
            } else {
                bookings.setStatus("failed");
                return bookings;
            }
        } else { // caretaker not required, only need available driver
            Drivers availableDriver = drivers.stream()
                    .filter(d -> d.getAvailability().equalsIgnoreCase("yes"))
                    .findFirst()
                    .orElse(null);

            if (availableDriver != null) {
                bookings.setDriver(availableDriver);
                availableDriver.setAvailability("no");
                bookings.setFare(calculateFare());
                bookings.setStatus("success");

                driverRepo.save(availableDriver);
                bookingRepo.save(bookings);

                return bookings;
            } else {
                bookings.setStatus("failed");
                return bookings;
            }
        }
    }


    public double calculateFare(){
        int size = 15;
        double min = 25.0;
        double max = 450.5;
        double[] arr = new double[size];
        Random rand = new Random();

        for (int i = 0; i < size; i++) {
            arr[i] = min + (max - min) * rand.nextDouble();
        }

        int randomIndex = rand.nextInt(size);
        double randomElement = arr[randomIndex];

        return randomElement;
    }
}
