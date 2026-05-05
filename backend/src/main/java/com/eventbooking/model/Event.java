package com.eventbooking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String department;
    private String venue;
    private LocalDateTime dateTime;
    private Double price;
    private Integer availableTickets;
    
    @Column(length = 1000)
    private String imageUrl;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }
    public LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(LocalDateTime dateTime) { this.dateTime = dateTime; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getAvailableTickets() { return availableTickets; }
    public void setAvailableTickets(Integer availableTickets) { this.availableTickets = availableTickets; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
