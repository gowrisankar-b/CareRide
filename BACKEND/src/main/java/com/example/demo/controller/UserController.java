package com.example.demo.controller;

import com.example.demo.model.Bookings;
import com.example.demo.model.Users;
import com.example.demo.repository.BookingRepo;
import com.example.demo.repository.UserRepo;
import com.example.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserRepo userRepo;

    @Autowired
    AdminService service;

    @Autowired
    BookingRepo bookingRepo;

    @GetMapping("/login")
    public boolean login(@RequestParam String username,
                         @RequestParam String password){
        return userRepo.findByUsernameAndPassword(username,password)!=null;
    }

    @PostMapping("/post/users")
    public void signUp(@RequestBody Users user){
        userRepo.save(user);
    }

    @PostMapping("/post/booking")
    public Bookings bookRide(@RequestBody Bookings bookings){
        bookings.setUser(userRepo.findByUsernameAndPassword(bookings.getUsername(),bookings.getPassword()));
        return service.bookRide(bookings);
    }

    @GetMapping("/get/bookings")
    public List<Bookings> getBookings(@RequestParam String username,
                                      @RequestParam String password){
        Users user=userRepo.findByUsernameAndPassword(username,password);
        return bookingRepo.findByUser(user);
    }
}
