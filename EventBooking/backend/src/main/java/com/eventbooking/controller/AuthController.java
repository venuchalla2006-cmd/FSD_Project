package com.eventbooking.controller;

import com.eventbooking.model.AppUser;
import com.eventbooking.repository.UserRepository;
import com.eventbooking.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Optional<AppUser> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            AppUser user = userOpt.get();
            if (user.getPassword().equals(password)) {
                if (user.getEmail() == null || user.getEmail().isEmpty()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does not have an email setup for OTP.");
                }

                // Generate 6-digit OTP
                String otp = String.format("%06d", new Random().nextInt(999999));
                user.setOtp(otp);
                user.setOtpExpiryTime(LocalDateTime.now().plusMinutes(5));
                userRepository.save(user);

                // Send OTP email
                emailService.sendEmail(user.getEmail(), "Your Login OTP - AuraTix", "Hello " + user.getUsername() + ",\n\nYour OTP for login is: " + otp + "\n\nThis OTP is valid for 5 minutes.");

                Map<String, Object> response = new HashMap<>();
                response.put("requiresOtp", true);
                response.put("message", "OTP sent to your email.");
                response.put("username", user.getUsername());
                
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        String email = credentials.get("email");

        if (username == null || username.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username and password are required");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        AppUser newUser = new AppUser();
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setEmail(email);
        newUser.setRole("USER"); // Default role

        userRepository.save(newUser);
        
        if (email != null && !email.trim().isEmpty()) {
            try {
                emailService.sendEmail(email, "Welcome to AuraTix!", "Hello " + username + ",\n\nWelcome to AuraTix! Your account has been successfully created.\n\nEnjoy booking the best events!");
            } catch (Exception e) {
                System.err.println("Failed to send welcome email: " + e.getMessage());
            }
        }
        
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String otp = payload.get("otp");

        Optional<AppUser> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            AppUser user = userOpt.get();
            if (user.getOtp() != null && user.getOtp().equals(otp)) {
                if (user.getOtpExpiryTime() != null && LocalDateTime.now().isBefore(user.getOtpExpiryTime())) {
                    // Valid OTP
                    user.setOtp(null);
                    user.setOtpExpiryTime(null);
                    userRepository.save(user);

                    // Send successful login alert
                    emailService.sendEmail(user.getEmail(), "New Login Alert - AuraTix", "Hello " + user.getUsername() + ",\n\nA new login to your AuraTix account was just detected.\n\nIf this was you, you can ignore this message.");

                    return ResponseEntity.ok(user);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP has expired");
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
    }
}
