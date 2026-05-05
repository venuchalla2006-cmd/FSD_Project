package com.eventbooking.controller;

import com.eventbooking.model.Event;
import com.eventbooking.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Event event) {
        if (event.getName() == null || event.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Event name is required");
        }
        if (event.getPrice() == null || event.getPrice() < 0) {
            return ResponseEntity.badRequest().body("Valid price is required");
        }
        if (event.getAvailableTickets() == null || event.getAvailableTickets() < 0) {
            return ResponseEntity.badRequest().body("Valid ticket count is required");
        }
        
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.ok(savedEvent);
    }
}
