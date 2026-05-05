package com.eventbooking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventBookingApplication {
    public static void main(String[] args) {
        SpringApplication.run(EventBookingApplication.class, args);
        System.out.println("\n=======================================================");
        System.out.println("🚀 APPLICATION STARTED!");

        System.out.println("👉 H2 Database Console: http://localhost:8083/h2-console");
        System.out.println("=======================================================\n");
    }
}
