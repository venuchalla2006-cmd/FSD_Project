package com.eventbooking.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String text) {
        if (mailSender == null) {
            System.out.println("Email Service is not configured. Mock sending email to " + to + ": " + subject);
            return;
        }
        
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom("noreply@auratix.com");
            helper.setTo(to);
            helper.setSubject(subject);
            // Set true to enable HTML formatting!
            helper.setText(text, true); 
            
            mailSender.send(message);
            System.out.println("Professional HTML email sent successfully to " + to);
        } catch (Exception e) {
            System.err.println("Failed to send email to " + to + ": " + e.getMessage());
            System.err.println("This is expected if valid SMTP credentials are not configured in application.properties.");
        }
    }
}
