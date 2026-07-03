package com.example.demo.controller;

import com.example.demo.model.Bookings;
import com.example.demo.model.Drivers;
import com.example.demo.model.Users;
import com.example.demo.repository.BookingRepo;
import com.example.demo.repository.DriverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/driver")
public class DriverController {

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    JavaMailSender mailSender;

    @Autowired
    BookingRepo bookingRepo;

    private Map<String, String> otpStorage = new HashMap<>();

    @GetMapping("/login")
    public boolean login(@RequestParam String username,
                         @RequestParam String password){
        return driverRepo.findByUsernameAndPassword(username,password) != null;
    }

    @PostMapping("/post/driver")
    public void signUp(@RequestBody Drivers user){
        driverRepo.save(user);
    }

    @GetMapping("/get/bookings")
    public List<Bookings> getBookings(@RequestParam String username,
                                      @RequestParam String password){
        Drivers driver = driverRepo.findByUsernameAndPassword(username,password);
        return bookingRepo.findByDriverUsername(driver.getUsername());
    }

    // Step 1: Send OTP only
    @PostMapping("/complete/{bookingId}")
    public ResponseEntity<?> sendOtpForCompletion(
            @PathVariable String bookingId,
            @RequestParam String username,
            @RequestParam String password) {

        Optional<Bookings> optionalBooking = bookingRepo.findById(bookingId);
        if (optionalBooking.isEmpty()) {
            return ResponseEntity.status(404)
                    .body("{\"status\":\"failed\", \"message\":\"Booking not found\"}");
        }

        Bookings booking = optionalBooking.get();

        // Generate OTP
        String otp = generateOTP();
        otpStorage.put(bookingId, otp);

        // Send OTP via email
        sendCompletionWithOtpEmail(booking, otp);

        return ResponseEntity.ok("{\"status\":\"success\", \"message\":\"OTP sent to user\"}");
    }

    // Step 2: Verify OTP & mark complete
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(
            @RequestParam String bookingId,
            @RequestParam String otp,
            @RequestParam String username,
            @RequestParam String password) {

        String correctOtp = otpStorage.get(bookingId);
        if (correctOtp == null || !correctOtp.equals(otp)) {
            return ResponseEntity.status(400)
                    .body("{\"status\":\"failed\", \"message\":\"Invalid OTP\"}");
        }

        Optional<Bookings> optionalBooking = bookingRepo.findById(bookingId);
        if (optionalBooking.isEmpty()) {
            return ResponseEntity.status(404)
                    .body("{\"status\":\"failed\", \"message\":\"Booking not found\"}");
        }

        Bookings booking = optionalBooking.get();
        Drivers driver = driverRepo.findByUsernameAndPassword(username, password);

        // OTP correct → mark complete
        booking.setDriverCompleted(true);
        bookingRepo.save(booking);

        driver.setAvailability("yes");
        driverRepo.save(driver);

        otpStorage.remove(bookingId); // remove OTP after use

        return ResponseEntity.ok("{\"status\":\"success\", \"message\":\"Booking completed successfully\"}");
    }

    private String generateOTP() {
        int otp = 100000 + new Random().nextInt(900000);
        return String.valueOf(otp);
    }

    private void sendCompletionWithOtpEmail(Bookings booking, String otp) {
        Users user = booking.getUser();
        if (user != null && user.getEmail() != null) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Your Ride Completed - SeniorGO");

            message.setText("Dear " + user.getName() + ",\n\n" +
                    "Your driver has successfully completed your ride.\n" +
                    "Booking ID: " + booking.getBookingId() + "\n\n" +
                    "Please use the following OTP to confirm completion: " + otp + "\n\n" +
                    "Thank you for using SeniorGO. We look forward to serving you again.\n\n" +
                    "Regards,\nSeniorGO Service Team");

            mailSender.send(message);
        }
    }
}
