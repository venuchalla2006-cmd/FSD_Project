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
                String emailHtml = "<div style=\"font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;\">" +
                        "<div style=\"background: linear-gradient(135deg, #6366f1, #a855f7); padding: 20px; text-align: center;\">" +
                        "<h1 style=\"color: #ffffff; margin: 0; font-size: 24px;\">AuraTix</h1></div>" +
                        "<div style=\"padding: 30px; color: #333333;\"><h2 style=\"margin-top: 0;\">Your Secure Login OTP</h2>" +
                        "<p style=\"font-size: 16px;\">Hello <strong>" + user.getUsername() + "</strong>,</p>" +
                        "<p style=\"font-size: 16px;\">You recently requested to log in. Please use the verification code below:</p>" +
                        "<div style=\"margin: 30px 0; text-align: center;\">" +
                        "<span style=\"font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #6366f1; background-color: #f3f4f6; padding: 15px 25px; border-radius: 8px;\">" + otp + "</span></div>" +
                        "<p style=\"font-size: 14px; color: #6b7280;\">This code is valid for 5 minutes. If you did not request this, please ignore this email.</p></div></div>";
                emailService.sendEmail(user.getEmail(), "Your Secure Login OTP - AuraTix", emailHtml);

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
            String welcomeHtml = "<div style=\"font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;\">" +
                    "<div style=\"background: linear-gradient(135deg, #10b981, #3b82f6); padding: 30px; text-align: center;\">" +
                    "<h1 style=\"color: #ffffff; margin: 0; font-size: 28px;\">Welcome to AuraTix!</h1></div>" +
                    "<div style=\"padding: 30px; color: #333333;\"><h2 style=\"margin-top: 0;\">Hello " + username + ",</h2>" +
                    "<p style=\"font-size: 16px;\">We are thrilled to have you join our community! Your account has been successfully created.</p>" +
                    "<p style=\"font-size: 16px;\">Get ready to explore, book, and experience the most exclusive events around the globe with premium support.</p>" +
                    "<div style=\"margin: 30px 0; text-align: center;\">" +
                    "<a href=\"http://localhost:5173\" style=\"background: #3b82f6; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-weight: bold;\">Explore Events Now</a></div></div></div>";
            emailService.sendEmail(email, "Welcome to AuraTix Event Platforms!", welcomeHtml);
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
                    String loginAlertHtml = "<div style=\"font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;\">" +
                            "<div style=\"background: #f59e0b; padding: 20px; text-align: center;\">" +
                            "<h1 style=\"color: #ffffff; margin: 0; font-size: 24px;\">New Login Detected</h1></div>" +
                            "<div style=\"padding: 30px; color: #333333;\"><p style=\"font-size: 16px;\">Hello <strong>" + user.getUsername() + "</strong>,</p>" +
                            "<p style=\"font-size: 16px;\">We noticed a successful login to your AuraTix account just now.</p>" +
                            "<p style=\"font-size: 14px; color: #6b7280; margin-top: 20px;\">If this was you, you don't need to do anything. If you didn't log in recently, please secure your account immediately.</p></div></div>";
                    emailService.sendEmail(user.getEmail(), "Security Alert: New Login - AuraTix", loginAlertHtml);

                    return ResponseEntity.ok(user);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP has expired");
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
    }
}
