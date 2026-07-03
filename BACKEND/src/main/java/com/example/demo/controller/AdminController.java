package com.example.demo.controller;

import com.example.demo.model.CareTakers;
import com.example.demo.model.Drivers;
import com.example.demo.model.Users;
import com.example.demo.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService service;
    @GetMapping("/get/users")
    public List<Users> getAllUsers(){
        return service.getAllusers();
    }

    @GetMapping("/get/drivers")
    public List<Drivers> getAllDrivers(){
        return service.getAllDrivers();
    }

    @GetMapping("/get/caretakers")
    public List<CareTakers> getAllCareTakers(){
        return service.getAllCareTakers();
    }
}
